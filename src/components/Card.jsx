import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

import { Card as ReactStrapCard, CardHeader, CardBody, CardImg, CardText } from "reactstrap";

const imageStyles = css`
	max-width: 200px;
`;

class Card extends PureComponent {
	cardTextMarkup = ({ label, text }) => {
		return (
			<CardText>
				<span className="font-weight-bolder">{`${label}:`}</span> {text}
			</CardText>
		);
	};

	render() {
		const { name, imageUrl, artist, originalType, setName } = this.props;

		return (
			<div className="col-md-3 flex-grow-1 mb-4">
				<ReactStrapCard className="pl-0 pr-0 h-100">
					<CardHeader>{name}</CardHeader>

					<CardBody className="d-flex flex-column">
						<figure className="figure mx-auto d-block mb-auto border-bottom pb-2">
							<CardImg
								top
								className={`mx-auto d-block figure-img img-fluid ${imageStyles} flex-grow-1`}
								src={imageUrl}
								alt={`${name} card image`}
							/>
							<figcaption className="figure-caption text-right">{name}</figcaption>
						</figure>

						<div className="pt-2">
							{artist &&
								this.cardTextMarkup({
									label: "Artist",
									text: artist
								})}

							{originalType &&
								this.cardTextMarkup({
									label: "Original Type",
									text: originalType
								})}

							{setName &&
								this.cardTextMarkup({
									label: "Set Name",
									text: setName
								})}
						</div>
					</CardBody>
				</ReactStrapCard>
			</div>
		);
	}
}

Card.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	artist: PropTypes.string,
	originalType: PropTypes.string,
	setName: PropTypes.string
};

export default Card;
