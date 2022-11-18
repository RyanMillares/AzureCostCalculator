import * as React from "react";
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
export default function App() {
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

function Layout() {
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/pricing-slider">Pricing Slider</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
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
