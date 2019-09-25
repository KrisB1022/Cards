import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Badge, Button, Navbar, NavbarBrand } from "reactstrap";
import logo from "../images/magic-banner-730x280.jpg";

class MainNav extends PureComponent {
  state = {
    showUserCards: false
  };

  showUserCards = () => {
    const { userCards, getCards } = this.props;

    getCards({
      clearCards: true,
      query: {
        id: Object.keys(userCards.byId)
      }
    });
    this.toggleUserCards();
  };

  hideUserCards = () => {
    this.props.applyFilters();
    this.toggleUserCards();
  };

  toggleUserCards = () =>
    this.setState(prevState => ({
      showUserCards: !prevState.showUserCards
    }));

  render() {
    const { showUserCards } = this.state;
    const { userCards, totalCount } = this.props;
    const numCards = Object.keys(userCards.byId).length;
    const hasNoCards = numCards === 0;

    return (
      <Navbar color="light" light expand="md" className="mb-3 sticky-top">
        <div className="container">
          <NavbarBrand href="/">
            <img
              className="img-fluid"
              src={logo}
              alt="Magic the Gathering logo"
              width={175}
            />
          </NavbarBrand>

          <p className="m-0">{`${totalCount} Cards`}</p>

          {showUserCards ? (
            <Button color="secondary" onClick={this.hideUserCards}>
              Hide my cards <Badge color="light">{numCards}</Badge>
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={this.showUserCards}
              disabled={hasNoCards}
            >
              Show my cards <Badge color="light">{numCards}</Badge>
            </Button>
          )}
        </div>
      </Navbar>
    );
  }
}

MainNav.propTypes = {
  totalCount: PropTypes.number.isRequired,
  userCards: PropTypes.shape({
    byId: PropTypes.object.isRequired
  }).isRequired
};

export default MainNav;
