import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

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
    Col,
    Table,
    Popover,
    PopoverHeader,
    PopoverBody,
    UncontrolledPopover,
    Collapse,
    Spinner
} from 'reactstrap';
import FetchData from './FetchData';

function PricingContent() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [serverQuantity, setServerQuantity] = useState(0);
    function updateServerQuantity(valueNow) {
        setServerQuantity(valueNow);
    }

    const [serverPerformance, setServerPerformance] = useState(1);
    function updateServerPerformance(valueNow) {
        setServerPerformance(valueNow);
    }

    const [serverScaling, setServerScaling] = useState(1);
    function updateServerScaling(valueNow) {
        setServerScaling(valueNow);
    }

    const vmPrice = 149;
    const paasApp = 98;

    return (
        <>
            <Row>
                <Col sm={{
                    offset: 3,
                    size: 6
                }}>

                    <div className="heading">
                        <h1>Azure Comparator </h1>
                        <p>This tool helps to illustrate the financial impact of a lift-and-shift strategy versus a PaaS strategy when migrating to Azure cloud.</p>
                        <p>Use the sliders to estimate reduced cost when choosing PaaS over lift-and-shift.</p>
                        <FetchData />
                    </div>

                    <div className="slider-container">
                        <div className="slider-heading">
                            <h2>Server Quantity</h2>
                            <Button className='btn-light' onClick={toggle} style={{ marginBottom: '1rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                </svg>
                            </Button>
                        </div>
                        <ReactSlider
                            className="horizontal-slider slider"
                            thumbClassName="example-thumb slider-thumb"
                            trackClassName="example-track slider-track"
                            defaultValue={[serverQuantity]}
                            ariaLabel={['Lower thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`} // TODO Pass state to parent
                            renderThumb={(props, state) => <div {...props}> <span className='value-now'> {serverQuantity}</span>  </div>}
                            pearling
                            minDistance={1}
                            snapDragDisabled={true}
                            min={0}
                            max={50}
                            onChange={(value, index) => updateServerQuantity(value)}
                        />
                        <Collapse isOpen={isOpen} className="server-list">
                            <Card>
                                <CardBody>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Lift/Shift</th>
                                                <th scope="col">Paas</th>
                                                <th scope="col">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Virtual Machines Dsv4 Series</td>
                                                <td>App</td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Virtual Machines Dsv4 Series</td>
                                                <td>App</td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td colSpan="2">Virtual Machines Dsv4 Series</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>

                    <div className="slider-container">
                        <div className="slider-heading">
                            <h2>Server Perfomance </h2>

                            <Button
                                id="UncontrolledPopover"
                                type="button"
                                className="btn-link"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" className="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                            </Button>
                            <UncontrolledPopover

                                placement="right"
                                target="UncontrolledPopover"
                            >
                                <PopoverHeader>
                                    Server Performance
                                </PopoverHeader>
                                <PopoverBody>
                                    Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                                </PopoverBody>
                            </UncontrolledPopover>

                        </div>
                        <ReactSlider
                            className="horizontal-slider slider"
                            thumbClassName="example-thumb slider-thumb"
                            trackClassName="example-track slider-track"
                            defaultValue={[serverPerformance]}
                            ariaLabel={['Lower thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}> <span className='value-now'>{serverPerformance}</span>  </div>}
                            pearling
                            minDistance={1}
                            snapDragDisabled={true}
                            min={1}
                            max={6}
                            onChange={(value, index) => updateServerPerformance(value)}
                        />
                    </div>
                    <div className="slider-container">
                        <h2>Server Scaling</h2>
                        <ReactSlider
                            className="horizontal-slider slider"
                            thumbClassName="example-thumb slider-thumb"
                            trackClassName="example-track slider-track"
                            defaultValue={[serverScaling]}
                            ariaLabel={['Lower thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}> <span className='value-now'> {serverScaling}</span>  </div>}
                            pearling
                            minDistance={1}
                            snapDragDisabled={true}
                            min={1}
                            max={5}
                            onChange={(value, index) => updateServerScaling(value)}
                        />
                    </div>
                </Col>
            </Row>

            <div className="prices">
                <div className="lift-shift">
                    <h2>Lift-and-Shift Cost: <strong>${new Intl.NumberFormat().format(vmPrice * serverQuantity * serverPerformance * serverScaling * 30)}/month</strong></h2>
                </div>
                <div className="paas">
                    <h2>Paas Cost: <strong>${new Intl.NumberFormat().format(paasApp * serverQuantity * serverPerformance * serverScaling * 30)}/month</strong></h2>
                </div>
                <div className="difference">
                    <h2>Difference: <strong>${new Intl.NumberFormat().format(
                        ((vmPrice * serverQuantity * serverPerformance * serverScaling * 30) - (paasApp * serverQuantity * serverPerformance * serverScaling * 30))
                        * 12
                    )}/year</strong></h2>
                </div>
            </div>
        </>
    );
}

export default function Pricing() {
    return <PricingContent />;
}