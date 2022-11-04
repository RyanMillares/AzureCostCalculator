import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';



import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
//import Avatar from '@mui/material/Avatar';
// import Logo from './AvanadeLogo.png';

import { getToggle, setToggle } from '../ToggleContext'
import TestComponent from './TestComponent'

import FormControl from '@mui/material/FormControl';
//import NetworkInfo from 'react-native-network-info';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
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
    PopoverBody
} from 'reactstrap';

// end bootstrap

//import globalnames from './globalvars.json' assert {type: 'json' };
import globalnames from '../globalvars.json'
import AddPopup from './AddPopup'
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ToggleContent from './collapse';
const theme = createTheme({
    typography: {
        fontFamily: ['"Segoe UI Light"']
    },
    palette: {
        primary: {
            main: '#FF5800',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});


function PricingContent() {
    const [appSize, setAppSize] = useState('Small');
    const [servers, setServers] = useState(0);
    const [sizeSelected, setSizeSelected] = useState(false);

    // Iaas variables
    const [webPrice, setWebPrice] = useState(0);
    const [apiPrice, setApiPrice] = useState(0);
    const [dbPrice, setDbPrice] = useState(0);

    // Paas variables
    const [websitePrice, setWebsitePrice] = useState(0);
    const [appservicePrice, setAppservicePrice] = useState(0);
    const [databasePrice, setDatabasePrice] = useState(0);

    //IaaS dropdown options
    const [iaasApi, setIaasApi] = useState([]);
    const [iaasDb, setIaasDb] = useState([]);
    const [iaasWeb, setIaasWeb] = useState([]);

    //PaaS dropdown options
    const [paasApp, setPaasApp] = useState([]);
    const [paasDb, setPaasDb] = useState([]);
    const [paasWeb, setPaasWeb] = useState([]);

    const [serverSizes, setSizes] = useState({})

    const [instances, setInstances] = useState(1)

    //UI for PaaS
    const [createMode, setMode] = useState(0)

    const PaasOptions = {
        'Website Tier': 'PaaSWeb',
        'AppService Tier': 'PaaSApp',
        'Database Tier': 'PaaSDB'
    }
    const IaasOptions = {
        'Web Tier': 'IaaSWeb',
        'API Tier': 'IaaSApi',
        'Database Tier': 'IaaSDB'
    }

    const [testVal, setVal] = useState(0)
    const [permVal, setPerm] = useState(0)

    function editRecord() {
        const apiServerNameObj = JSON.stringify(globalnames);

        const name = JSON.parse(apiServerNameObj);
        const apiServerName = name.serverName;
        let postUrl = "https://" + apiServerName + ":7056/api/PaaSWeb";
        postUrl += ("?pwid=9e460b38-e0ce-48ed-abaf-d0cfa28c3ebf&name=UrlPut&cpu=1&ram=5&storage=12&cost=42")
        axios.put(postUrl, {
            headers: {
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS'

            },
        })


    }

    function setServerSizes(sizes) {
        //console.log(sizes)
        const newSizes = {}

        // create the object
        sizes.forEach(function (sizeObject) {
            // if the size property doesn't exists, create the property
            if (!newSizes.hasOwnProperty(sizeObject.size)) {
                newSizes[sizeObject.size] = []
            }
            // the size property exists already, push to existing property

            newSizes[sizeObject.size].push(sizeObject.servers)

        })

        // sort each property's array in ascending order
        Object.keys(newSizes).forEach(function (sizeName) {
            newSizes[sizeName] = newSizes[sizeName].sort()
        })
        console.log(newSizes.length)
        setSizes(newSizes)

    }

    // this implementation is not connected to the database; all submitted data is lost upon a refresh




    const numServers = {
        'Small': [3, 6, 9],
        'Medium': [12, 15, 18],
        'Large': [21, 24, 27],
        'XL': [30, 33, 36]
    }

    function TestToggle(toggleVal) {

        setToggle(toggleVal)
        setPerm(toggleVal)
        //useForceUpdate()
        console.log("testval: " + toggleVal)
    }
    useEffect(() => {

        //tbd, to replace 'localhost' in the url

        const apiServerNameObj = JSON.stringify(globalnames);


        const name = JSON.parse(apiServerNameObj);
        const apiServerName = name.serverName;
        //tbd, to replace 'localhost' in the url
        //console.log(apiServerName)
        const url1 = "https://" + apiServerName + ":7056/api/IaaSAPI";
        const url2 = "https://" + apiServerName + ":7056/api/IaaSDB";
        const url3 = "https://" + apiServerName + ":7056/api/IaaSWeb";
        const url4 = "https://" + apiServerName + ":7056/api/PaaSApp";
        const url5 = "https://" + apiServerName + ":7056/api/PaaSDB";
        const url6 = "https://" + apiServerName + ":7056/api/PaaSWeb";
        const url7 = "https://" + apiServerName + ":7056/api/ServerSize/Sorted";
        console.log(url1)

        const p1 = axios.get(url1);
        const p2 = axios.get(url2);
        const p3 = axios.get(url3);
        const p4 = axios.get(url4);
        const p5 = axios.get(url5);
        const p6 = axios.get(url6);
        const p7 = axios.get(url7);

        Promise.all([p1, p2, p3, p4, p5, p6, p7]).then((values) => {
            setIaasApi(values[0].data.sort((a, b) => a.cost - b.cost));
            setIaasDb(values[1].data.sort((a, b) => a.cost - b.cost));
            setIaasWeb(values[2].data.sort((a, b) => a.cost - b.cost));
            setPaasApp(values[3].data.sort((a, b) => a.cost - b.cost));
            setPaasDb(values[4].data.sort((a, b) => a.cost - b.cost));
            setPaasWeb(values[5].data.sort((a, b) => a.cost - b.cost));
            setServerSizes(values[6].data);
        })
    }, [getToggle()])

    return (


        <>
            <Row>
                <Col sm={{
                    offset: 3,
                    size: 6
                }}>
                    <h1 class="display-1">Azure Comparator</h1>


                    <div className="slider-container">

                        <h1>Server Quantity</h1>

                        <ToggleContent />
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
                            snapDragDisabled='true'
                            min={0}
                            max={50}
                        />
                    </div>

                    <div className="slider-container">
                        <h1>Server Perfomance</h1>
                        <ToggleContent />

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
                            snapDragDisabled='true'
                            min={0}
                            max={6}
                        />

                    </div>

                    <div className="slider-container">
                        <h1>Server Scaling</h1>
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
                            snapDragDisabled='true'
                            min={0}
                            max={5}
                        >

                        </ReactSlider>
                    </div>
                </Col>
            </Row>

            <div className="prices">

                <div className="lift-shift">
                    <h1>Lift-and-Shift Cost: <strong>$8800/month</strong></h1>
                </div>
                <div className="paas">
                    <h1>Paas Cost: <strong>$5200/month</strong></h1>
                </div>
                <div className="difference">
                    <h1>Difference: <strong>$43k/year</strong></h1>
                </div>
            </div>

        </>


    );
}

export default function Pricing() {
    return <PricingContent />;
}