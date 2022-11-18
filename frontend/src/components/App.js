import * as React from "react";
import Layout from "./Layout";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Pricing from './Pricing';
import PricingSlider from './PricingSlider';
import Header from './Header';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
// For reference: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/basic?file=src%2FApp.tsx
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PricingPage />} />
                    <Route path="pricing-slider" element={<PricingSlider />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
}


function PricingPage() {
    return (
        <Pricing />
    );
}


function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
export default App;