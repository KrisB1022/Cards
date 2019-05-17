import React from 'react';

import { Navbar, NavbarBrand } from "reactstrap";
import logo from '../images/magic-banner-730x280.jpg';

const MainNav = () => (
    <Navbar color="light" light expand="md" className="mb-3">
        <div className="container">
            <NavbarBrand href="/">
                <img
                    className="img-fluid"
                    src={logo}
                    alt="Magic the Gathering logo"
                    width={175}
                />
            </NavbarBrand>
        </div>
    </Navbar>
)

export default MainNav;
