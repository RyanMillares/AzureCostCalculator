import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from './Header';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    CardBody,
    Card,
    Input,
    Form,
    FormGroup,
    Label,
    Container,
    Row,
    Col
} from 'reactstrap';

function Layout() {
    return (
        <>


            <Header />
            <Container>
                <Row>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </Container>

        </>
    );
}
export default Layout;