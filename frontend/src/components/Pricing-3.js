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
    Collapse
} from 'reactstrap';

// end bootstrap




function PricingContent() {
    const [isOpen, setIsOpen] = useState(false);

    const [serverQuantity, setServerQuantity] = useState(5);
    function updateServer(valueNow) {
        setServerQuantity(valueNow);
    }

    const [serverPerformance, setServerPerformance] = useState(3);
    const toggle = () => setIsOpen(!isOpen);

    const vmPrice = 149;
    //console.log('sq: ', updateServer())
    useEffect(() => {






    });

    return (


        <>
            <Row>
                <Col sm={{
                    offset: 3,
                    size: 6
                }}>
                    <h1>Azure Comparator </h1>
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
                            defaultValue={[6]}
                            ariaLabel={['Lower thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`} // TODO Pass state to parent
                            renderThumb={(props, state) => <div {...props}> <span className='value-now'> {serverQuantity}</span>  </div>}
                            pearling
                            minDistance={1}
                            snapDragDisabled={true}
                            min={0}
                            max={50}
                            // onChange={state => updateServer(state.valueNow)}
                            onChange={(value, index) => console.log(`onChange: ${JSON.stringify({ value, index })}`)}
                            onAfterChange={(value, index) => updateServer(value)}
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
                        <h2>Server Perfomance</h2>

                        <ReactSlider
                            className="horizontal-slider slider"
                            thumbClassName="example-thumb slider-thumb"
                            trackClassName="example-track slider-track"
                            defaultValue={[6]}
                            ariaLabel={['Lower thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}> <span className='value-now'> {state.valueNow}</span>  </div>}
                            pearling
                            minDistance={1}
                            snapDragDisabled={true}
                            min={0}
                            max={6}
                        />

                    </div>

                    <div className="slider-container">
                        <h2>Server Scaling</h2>
                        <ReactSlider
                            className="horizontal-slider slider"
                            thumbClassName="example-thumb slider-thumb"
                            trackClassName="example-track slider-track"
                            defaultValue={[1]}
                            ariaLabel={['Lower thumb']}
                            ariaValuetext={state => `Thumb value ${state.valueNow}`}
                            renderThumb={(props, state) => <div {...props}> <span className='value-now'> {state.valueNow}</span>  </div>}
                            pearling
                            minDistance={1}
                            snapDragDisabled={true}
                            min={0}
                            max={5}
                        >

                        </ReactSlider>
                    </div>
                </Col>
            </Row>

            <div className="prices">

                <div className="lift-shift">
                    <h2>Lift-and-Shift Cost: <strong>${vmPrice * serverQuantity * 30}/month</strong></h2>
                </div>
                <div className="paas">
                    <h2>Paas Cost: <strong>$5200/month</strong></h2>
                </div>
                <div className="difference">
                    <h2>Difference: <strong>$43k/year</strong></h2>
                </div>
            </div>

        </>


    );
}

export default function Pricing() {
    return <PricingContent />;
}