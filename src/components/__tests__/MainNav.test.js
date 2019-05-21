import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import { Navbar, NavbarBrand } from "reactstrap";
import MainNav from "../MainNav";
import logo from "../../images/magic-banner-730x280.jpg";

it("renders without crashing", () => {
	shallow(<MainNav />);
});

it("has correct markup", () => {
	const wrapper = shallow(<MainNav />);

	expect(wrapper.find(Navbar).exists()).toBeTruthy();
	expect(wrapper.find(NavbarBrand).exists()).toBeTruthy();

	expect(wrapper.find("img").exists()).toBeTruthy();
	expect(wrapper.find("img").prop("src")).toEqual(logo);
});

it("matches snapshot", () => {
	const tree = renderer.create(<MainNav />);

	expect(tree.toJSON()).toMatchSnapshot();
});
