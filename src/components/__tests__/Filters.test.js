import React from "react";
import { shallow } from "enzyme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormGroup, Label, Input, Modal, ModalFooter } from "reactstrap";

import Filters from "../Filters";
import { fetchApi } from "../../helpers/AjaxHelpers";
import { typesEndpoint } from "../../helpers/ApiEndpoints";
jest.mock("../../helpers/AjaxHelpers");

let wrapper;
const onChangeMock = jest.fn();
const onInputMock = jest.fn();
const typesOptionsMock = ["type1", "type2", "type3"];
const filtersMock = {
	artist: "an artist",
	name: "a name",
	orderBy: Filters.orderByOptions[0],
	pageSize: Filters.pageSizeOptions[0]
};

beforeEach(() => {
	onChangeMock.mockClear();
	onInputMock.mockClear();

	wrapper = shallow(
		<Filters onChange={onChangeMock} onInput={onInputMock} filters={filtersMock} />
	);
});

beforeAll(() => {
	fetchApi.mockImplementation(() => {
		return Promise.resolve({
			json: () => Promise.resolve({ types: typesOptionsMock })
		});
	});
});

it("renders without crashing", () => {
	shallow(<Filters onChange={onChangeMock} onInput={onInputMock} filters={filtersMock} />);
});

it("has 1 primary <Button/> and <FontAwesomeIcon/>", () => {
	expect(
		wrapper
			.find(Button)
			.at(0)
			.exists()
	).toBeTruthy();
	expect(wrapper.find(Button).at(0).length).toBe(1);

	expect(wrapper.find(FontAwesomeIcon).exists()).toBeTruthy();
	expect(wrapper.find(FontAwesomeIcon).prop("icon")).toEqual(faBars);
});

it("has 1 <Modal/>", () => {
	expect(wrapper.find(Modal).exists()).toBeTruthy();
	expect(wrapper.find(Modal).length).toBe(1);
});

it("has 5 <Input/>", () => {
	expect(wrapper.find(Input).length).toBe(5);
});

it(`it has ${typesOptionsMock.length} options for Types`, () => {
	const input = wrapper.find("#types");
	expect(input.find("option").length).toBe(typesOptionsMock.length);
});

it(`it has ${Filters.orderByOptions.length + 1} options for Order By`, () => {
	const input = wrapper.find("#orderBy");
	expect(input.find("option").length).toBe(Filters.orderByOptions.length + 1);
});

it(`it has ${Filters.pageSizeOptions.length} options for Page Size`, () => {
	const input = wrapper.find("#pageSize");
	expect(input.find("option").length).toBe(Filters.pageSizeOptions.length);
});

it("has 1 <ModalFooter/> and close <Button/>", () => {
	expect(wrapper.find(ModalFooter).exists()).toBeTruthy();
	expect(wrapper.find(ModalFooter).length).toBe(1);

	const btn = wrapper.find(Button).at(1);
	expect(btn.exists()).toBeTruthy();
	expect(btn.length).toBe(1);
});

it("calls fetchApi for componentDidMount", async () => {
	fetchApi.mockClear();

	await wrapper.instance().componentDidMount();

	expect(fetchApi).toHaveBeenCalledTimes(1);
	expect(fetchApi).toHaveBeenCalledWith(typesEndpoint);
});

it("catches error for fetchApi", async () => {
	const error = "error message";
	fetchApi.mockImplementationOnce(() => Promise.reject(error));
	const spy = jest.spyOn(console, "error").mockImplementation(args => args);

	await wrapper.instance().componentDidMount();

	expect(spy).toHaveBeenCalledTimes(1);
	expect(spy).toHaveBeenCalledWith(error);
});

it("toggles isOpen for toggle", () => {
	wrapper.setState({
		isOpen: false
	});

	wrapper.instance().toggle();
	expect(wrapper.state().isOpen).toBeTruthy();

	wrapper.instance().toggle();
	expect(wrapper.state().isOpen).toBeFalsy();
});

it("prevents default on submit of form", () => {
	const form = wrapper.find(Form);
	const event = { preventDefault: jest.fn() };

	form.simulate("submit", event);

	expect(event.preventDefault).toHaveBeenCalledTimes(1);
});

it("calls onInput on input for Card Name", () => {
	const input = wrapper.find("#name");
	const value = "name change";

	input.simulate("input", value);

	expect(onInputMock).toHaveBeenCalledTimes(1);
	expect(onInputMock).toHaveBeenCalledWith(value);
});

it("calls onInput on input for Artist", () => {
	const input = wrapper.find("#artist");
	const value = "artist change";

	input.simulate("input", value);

	expect(onInputMock).toHaveBeenCalledTimes(1);
	expect(onInputMock).toHaveBeenCalledWith(value);
});

it("calls onChange on change for Types", () => {
	const input = wrapper.find("#types");
	const value = typesOptionsMock[0];

	input.simulate("change", value);

	expect(onChangeMock).toHaveBeenCalledTimes(1);
	expect(onChangeMock).toHaveBeenCalledWith(value);
});

it("calls onChange on change for Order By", () => {
	const input = wrapper.find("#orderBy");
	const value = Filters.orderByOptions[0];

	input.simulate("change", value);

	expect(onChangeMock).toHaveBeenCalledTimes(1);
	expect(onChangeMock).toHaveBeenCalledWith(value);
});

it("calls onChange on change for Max Results", () => {
	const input = wrapper.find("#pageSize");
	const value = Filters.pageSizeOptions[0];

	input.simulate("change", value);

	expect(onChangeMock).toHaveBeenCalledTimes(1);
	expect(onChangeMock).toHaveBeenCalledWith(value);
});
