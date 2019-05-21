import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import { Card as ReactStrapCard, CardHeader, CardBody, CardImg, CardText } from "reactstrap";
import Card from "../Card";

let wrapper;

beforeEach(() => {
	wrapper = shallow(<Card imageUrl="image.com" name="name" />);
});

it("renders without crashing", () => {
	shallow(<Card imageUrl="image.com" name="name" />);
});

it("has 1 <ReactStrapCard/>", () => {
	expect(wrapper.find(ReactStrapCard).exists()).toBeTruthy();
	expect(wrapper.find(ReactStrapCard).length).toBe(1);
});

it("has 1 <CardBody/>", () => {
	expect(wrapper.find(CardBody).exists()).toBeTruthy();
	expect(wrapper.find(CardBody).length).toBe(1);
});

it("has 1 <CardImg/>", () => {
	expect(wrapper.find(CardImg).exists()).toBeTruthy();
	expect(wrapper.find(CardImg).length).toBe(1);
});

it("has 3 <CardText/>", () => {
	wrapper.setProps({
		artist: "artist",
		originalType: "originalType",
		setName: "setName"
	});

	expect(wrapper.find(CardText).exists()).toBeTruthy();
	expect(wrapper.find(CardText).length).toBe(3);
});

it("matches snapshot", () => {
	const tree = renderer.create(
		<Card
			imageUrl="url.com"
			name="name"
			artist="artist"
			originalType="originalType"
			setName="setName"
		/>
	);

	expect(tree.toJSON()).toMatchSnapshot();
});
