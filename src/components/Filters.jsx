import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormGroup, Label, Input, Modal, ModalFooter } from "reactstrap";

import { fetchApi } from "../helpers/AjaxHelpers";
import { typesEndpoint } from "../helpers/ApiEndpoints";

const buttonStyles = css`
	bottom: 0;
	right: 0;
`;

class Filters extends PureComponent {
	static orderByOptions = ["artist", "name", "rarity", "set", "type"];
	static pageSizeOptions = ["10", "25", "50", "100"];

	state = {
		isOpen: false,
		typesOptions: []
	};

	componentDidMount() {
		return fetchApi(typesEndpoint)
			.then(res => res.json())
			.then(res =>
				this.setState({
					typesOptions: res.types
				})
			)
			.catch(err => console.error(err)); // todo: hook up to page toast
	}

	toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

	render() {
		const { disabled, filters, onChange, onInput, totalCount } = this.props;
		const { isOpen, typesOptions } = this.state;

		const { artist, name, orderBy, pageSize, types } = filters;

		return (
			<Fragment>
				<Button
					color="secondary"
					onClick={this.toggle}
					className={`position-fixed mb-3 mr-3 ${buttonStyles}`}
					disabled={disabled}
				>
					<FontAwesomeIcon icon={faBars} />
				</Button>

				<Modal autoFocus={true} isOpen={isOpen} toggle={this.toggle} centered={true}>
					<Form onSubmit={evt => evt.preventDefault()} className="p-3">
						<FormGroup>
							<Label for="name">Card Name</Label>
							<Input value={name} name="name" id="name" onInput={onInput} />
						</FormGroup>

						<FormGroup>
							<Label for="artist">Artist</Label>
							<Input value={artist} name="artist" id="artist" onInput={onInput} />
						</FormGroup>

						<FormGroup>
							<Label for="types">Types</Label>
							<Input
								type="select"
								name="types"
								onChange={onChange}
								id="types"
								value={types}
							>
								{typesOptions &&
									typesOptions.map(typesOption => {
										return (
											<option
												key={typesOption}
												value={typesOption.toLowerCase()}
											>
												{typesOption}
											</option>
										);
									})}
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="orderBy">Order By</Label>
							<Input
								type="select"
								name="orderBy"
								onChange={onChange}
								id="orderBy"
								value={orderBy}
								className="text-capitalize"
							>
								<option value="" defaultValue disabled />

								{Filters.orderByOptions.map(orderByOption => {
									return (
										<option key={orderByOption} value={orderByOption}>
											{orderByOption}
										</option>
									);
								})}
							</Input>
						</FormGroup>

						<FormGroup>
							<Label for="pageSize">Max Results</Label>
							<Input
								type="select"
								name="pageSize"
								onChange={onChange}
								id="pageSize"
								value={pageSize}
							>
								{Filters.pageSizeOptions.map(pageSizeOption => {
									return (
										<option key={pageSizeOption} value={pageSizeOption}>
											{pageSizeOption}
										</option>
									);
								})}
							</Input>
						</FormGroup>
					</Form>

					<ModalFooter>
						{`${totalCount} total cards`}
						<Button className="ml-3" color="secondary" onClick={this.toggle}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
			</Fragment>
		);
	}
}

Filters.propTypes = {
	onChange: PropTypes.func.isRequired,
	onInput: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	filters: PropTypes.shape({
		artist: PropTypes.string,
		name: PropTypes.string,
		orderBy: PropTypes.string,
		pageSize: PropTypes.string,
		types: PropTypes.string
	}),
	totalCount: PropTypes.string
};

export default Filters;
