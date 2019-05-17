import React, { Fragment, PureComponent } from "react";

import { Spinner } from "reactstrap";

import { cardsEndpoint } from "./helpers/ApiEndpoints";
import { fetchApi, queryFormatHelper } from "./helpers/AjaxHelpers";
import MainNav from "./components/MainNav";
import Card from "./components/Card";

// https://api.magicthegathering.io/v1/cards?page=0&pageSize=50&types=creature

class App extends PureComponent {
	state = {
		cards: [],
		currentPage: 1,
		isPageLoading: true
	};

	componentDidMount() {
		const query = ["types=creature", `page=${this.state.currentPage}`, "pageSize=50"];
		this.getCards(query).then(() => this.setState({ isPageLoading: false }));
	}

	getCards = query => {
		const params = queryFormatHelper(query);
		return fetchApi(`${cardsEndpoint}${params}`)
			.then(res => {
				this.setState({
					cards: res.cards
				});
			})
			.catch(err => console.warn("An error occurred", err)); // Catch error, show toast
	};

	render() {
		const { cards, isPageLoading } = this.state;
		const hasCards = cards && cards.length > 0;

		if (isPageLoading) {
			return (
				<div className="col d-flex justify-content-center align-items-center vh-100">
					<Spinner color="secondary" />
				</div>
			);
		}

		return (
			<Fragment>
				<MainNav />

				<div className="container">
					<div className="row">
						{hasCards ? (
							cards.map(card => {
								const { artist, imageUrl, name, originalType, setName } = card;
								const key = `${artist}-${name}-${imageUrl}`;

								return (
									<Card
										key={key}
										artist={artist}
										imageUrl={imageUrl}
										name={name}
										originalType={originalType}
										setName={setName}
									/>
								);
							})
						) : (
							<div className="col d-flex justify-content-center align-items-center vh-100">
								<Spinner color="secondary" />
							</div>
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
