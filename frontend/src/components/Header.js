import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link } from "react-router-dom";
import logo from './../img/avanade-logo.png';
function Header(args) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (

        <Navbar {...args} container={false} color="primary" dark={true}>

            <NavbarBrand href="/">
                <img
                    alt="Avanade Logo"
                    src={logo}

                />

            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <Link to="/">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/pricing-slider">Pricing Slider</Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>

    );
}

export default Header;