import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import { Button, Navbar, NavbarBrand } from "reactstrap";
import MainNav from "../MainNav";
import logo from "../../images/magic-banner-730x280.jpg";

const totalCountMock = 20;
const userCardsMock = {
  byId: {}
};

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <MainNav totalCount={totalCountMock} userCards={userCardsMock} />
  );
});

it("renders without crashing", () => {
  shallow(<MainNav totalCount={totalCountMock} userCards={userCardsMock} />);
});

it("has 1 <NavBar/> and <NavBarBrand/>", () => {
  expect(wrapper.find(Navbar).exists()).toBeTruthy();
  expect(wrapper.find(NavbarBrand).exists()).toBeTruthy();
});

it("has 1 img", () => {
  expect(wrapper.find("img").exists()).toBeTruthy();
  expect(wrapper.find("img").prop("src")).toEqual(logo);
});

it("has Hide button if showUserCards = true", () => {
  wrapper.setState({
    showUserCards: true
  });

  const btn = wrapper.find(Button);

  expect(btn.exists()).toBeTruthy();
  expect(btn.prop("children")[0]).toMatch(/^Hide my cards/);
});

it("has Show button if showUserCards = false", () => {
  wrapper.setState({
    showUserCards: false
  });

  const btn = wrapper.find(Button);

  expect(btn.exists()).toBeTruthy();
  expect(btn.prop("children")[0]).toMatch(/^Show my cards/);
});

it("calls getCards and toggleUserCards for showUserCards", () => {
  const byId = { key1: true, key2: false };
  const getCardsMock = jest.fn();
  const spy = jest.spyOn(wrapper.instance(), "toggleUserCards");
  wrapper.setProps({
    userCards: { byId },
    getCards: getCardsMock
  });

  wrapper.instance().showUserCards();

  expect(getCardsMock).toHaveBeenCalledTimes(1);
  expect(getCardsMock).toHaveBeenCalledWith({
    clearCards: true,
    query: {
      id: Object.keys(byId)
    }
  });
  expect(spy).toHaveBeenCalledTimes(1);
});

it("calls applyFilters and toggleUserCards for hideUserCards", () => {
  const applyFiltersMock = jest.fn();
  const spy = jest.spyOn(wrapper.instance(), "toggleUserCards");
  wrapper.setProps({
    applyFilters: applyFiltersMock
  });

  wrapper.instance().hideUserCards();

  expect(applyFiltersMock).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledTimes(1);
});

it("toggles showUserCards for toggleUserCards", () => {
  wrapper.setState({
    showUserCards: false
  });

  wrapper.instance().toggleUserCards();
  expect(wrapper.state().showUserCards).toBeTruthy();

  wrapper.instance().toggleUserCards();
  expect(wrapper.state().showUserCards).toBeFalsy();
});

it("matches snapshot", () => {
  const tree = renderer.create(
    <MainNav totalCount={totalCountMock} userCards={userCardsMock} />
  );

  expect(tree.toJSON()).toMatchSnapshot();
});
