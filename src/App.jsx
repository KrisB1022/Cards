import React, { Fragment, PureComponent } from "react";

import { Spinner } from "reactstrap";

import { cardsEndpoint } from "./helpers/ApiEndpoints";
import { fetchApi, queryFormatHelper } from "./helpers/AjaxHelpers";
import MainNav from "./components/MainNav";
import Card from "./components/Card";
import Filters from "./components/Filters";

class App extends PureComponent {
	state = {
		cards: [],
		isLoadingMore: false,
		isPageLoading: true,
		filters: {
			orderBy: "name",
			page: "1",
			pageSize: "20",
			types: "creature"
		}
	};

	componentDidMount() {
		// typically I'd put this function into it's own class method
		// and then call if from here; however, due to the app size
		// I decided to leave it as such.
		return this.getCards({ clearCards: true }).then(() => {
			window.addEventListener("scroll", this.handleScroll);
		});
	}

	handleScroll = () => {
		const { cards, isLoadingMore, totalCount } = this.state;
		const hasAllCards = parseInt(totalCount) === cards.length;

		if (isLoadingMore || hasAllCards) {
			return;
		}

		const { innerHeight, scrollY } = window;

		if (innerHeight + scrollY >= document.body.offsetHeight - 600) {
			this.getCards();
		}
	};

	applyFilters = filter => {
		// Since setState is async and the state is needed for the getCards
		// call, I needed to return a Promise.resolve when state was updated
		// specifically for the onChange method
		return new Promise(resolve => {
			this.setState(
				prevState => ({
					filters: {
						...prevState.filters,
						...filter,
						page: 1
					}
				}),
				() => resolve()
			);
		});
	};

	onChange = ({ target: { id, value } }) => {
		const filter = { [id]: value };
		return this.applyFilters(filter).then(() => this.getCards({ clearCards: true }));
	};

	onInput = ({ target: { id, value } }) => {
		// Timeouts here will prevent multile unnessesary calls to the
		// api when a user is typing. I found that from 250ms-500ms is
		// a good time to wait for a call to be made.
		clearTimeout(this.timer);

		const filter = { [id]: value };
		this.applyFilters(filter);

		this.timer = setTimeout(() => {
			this.getCards({ clearCards: true });
		}, 300);
	};

	getCards = ({ clearCards = false } = {}) => {
		const params = queryFormatHelper(this.state.filters);

		this.setState({ isLoadingMore: true, isPageLoading: clearCards });

		return fetchApi(`${cardsEndpoint}${params}`)
			.then(res => {
				// IF I was to design this API response I would have a more
				// easier way to access the meta information.
				// Usually something like response: { data: {...}, meta: {...} }
				// where the meta information would contain pagination, total, etc,
				// really anything that is about the data.
				// This would also allow me to test if the response is application/json
				// and resolve that res.json() portion inside my fetchApi helper
				// instead of each time I make a call using the fetchApi method.
				// Also means less repeat testing.
				const { headers } = res;
				const totalCount = headers.get("total-count");
				const hasPages = headers.get("link").includes('rel="next"');

				this.setState(prevState => {
					const { page } = prevState.filters;

					return {
						totalCount,
						filters: {
							...prevState.filters,
							page: hasPages ? page + 1 : page
						}
					};
				});

				return res.json();
			})
			.then(res => {
				if (clearCards) {
					window.scroll({
						top: 0,
						left: 0,
						behavior: "smooth"
					});
				}

				this.setState(prevState => {
					const cards = clearCards ? res.cards : [...prevState.cards, ...res.cards];

					return {
						cards,
						isLoadingMore: false,
						isPageLoading: false
					};
				});
			})
			.catch(err => console.warn("An error occurred", err)); // TODO: Catch error, show toast
	};

	render() {
		const { cards, isLoadingMore, isPageLoading, filters, totalCount } = this.state;
		const hasCards = cards && cards.length > 0;

		return (
			<div>
				<MainNav />

				<div className="container">
					{hasCards ? (
						<Fragment>
							<div className="row">
								{cards.map((card, index) => {
									const { artist, imageUrl, name, originalType, setName } = card;
									// Data wasn't unique for everything so unfortuntly I had to use
									// the index of the loop. Generally something that I avoid if possible.
									const key = `${artist}-${name}-${index}`;

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
								})}
							</div>

							{isLoadingMore && (
								<div className="row">
									<div className="col d-flex justify-content-center align-items-center mb-5">
										<Spinner color="secondary" />
									</div>
								</div>
							)}
						</Fragment>
					) : (
						<div className="row">
							<div className="col d-flex justify-content-center align-items-center vh-100 mt-n5">
								{isPageLoading ? (
									<Spinner color="secondary" />
								) : (
									<p className="m-0">No Data Found</p>
								)}
							</div>
						</div>
					)}

					<Filters
						disabled={isPageLoading || isLoadingMore}
						filters={filters}
						onChange={this.onChange}
						onInput={this.onInput}
						totalCount={totalCount}
					/>
				</div>
			</div>
		);
	}
}

export default App;
