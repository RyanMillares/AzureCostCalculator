import * as React from 'react';
import { useState, useEffect } from 'react';
import useForceUpdate from 'use-force-update';

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
    Col
} from 'reactstrap';

// end bootstrap

//import globalnames from './globalvars.json' assert {type: 'json' };
import globalnames from '../globalvars.json'
import AddPopup from './AddPopup'
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <Row>
                <Col>
                    <Form>
                        <FormGroup className='sizing'>
                            <div className="form-floating">
                                <Input
                                    id="app-size"
                                    name="app_size"
                                    type="select"
                                >
                                    {Object.keys(serverSizes).map(size => {
                                        return <option
                                            value={size}
                                            selected
                                            onClick={(e) => {
                                                setAppSize(size);
                                                setSizeSelected(true);
                                            }}>
                                            {size}
                                        </option>
                                    }
                                    )}
                                </Input>
                                <Label for="app-size">
                                    App Size
                                </Label>
                            </div>
                        </FormGroup>

                        <FormGroup className='sizing'>
                            <Label for="app-size">
                                Lift-and-Shift
                            </Label>
                            <Input
                                id="app-size"
                                name="app_size"
                                type="select"
                            >
                                {Object.keys(serverSizes).map(size => {
                                    return <option
                                        value={size}
                                        selected
                                        onClick={(e) => {
                                            setAppSize(size);
                                            setSizeSelected(true);
                                        }}>
                                        {size}
                                    </option>
                                }
                                )}
                            </Input>
                        </FormGroup>


                    </Form>

                    <Card>
                        <CardHeader
                            title="Lift-and-Shift" //IaaS
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[200]
                                        : theme.palette.grey[700],
                            }}
                            action={
                                <Button title="Add Shift-and-Lift Options" variant="contained"
                                    onClick={() => TestToggle(1)}
                                //disabled={getToggle() != 0}
                                ><AddIcon sx={{ color: 'white' }}></AddIcon></Button>
                            }
                        />
                        <CardContent>
                            <Input
                                type="select"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Web Tier</InputLabel>
                                <Select
                                    label="Web Tier"
                                    variant="outlined"
                                >
                                    {
                                        iaasWeb.map(e => {
                                            return <MenuItem value={e.vm} onClick={() => setWebPrice(e.cost)}>{e.vm} CPU: {e.cpu}, RAM: {e.ram}, Storage: {e.storage}, Price: {e.cost}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>


                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">API Tier</InputLabel>
                                <Select
                                    label="API Tier"
                                    variant="outlined"
                                >
                                    {
                                        iaasApi.map(e => {
                                            return <MenuItem value={e.vm} onClick={() => setApiPrice(e.cost)}>{e.vm} CPU: {e.cpu}, RAM: {e.ram}, Storage: {e.storage}, Price: {e.cost}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>


                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">DB Tier</InputLabel>
                                <Select
                                    label="DB Tier"
                                    variant="outlined"
                                >
                                    {
                                        iaasDb.map(e => {
                                            return <MenuItem value={e.vm} onClick={() => setDbPrice(e.cost)}>{e.vm} CPU: {e.cpu}, RAM: {e.ram}, Storage: {e.storage}, Price: {e.cost}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>


                            <Typography variant="h4" align="center">
                                ${(webPrice * (servers / 3)).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                Web Cost
                            </Typography>


                            <Typography variant="h4" align="center">
                                ${(apiPrice * (servers / 3)).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                API Cost
                            </Typography>

                            <Typography variant="h4" align="center">
                                ${(dbPrice * (servers / 3)).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                DB Cost
                            </Typography>


                            <Typography variant="h2" align="center">
                                ${((webPrice + apiPrice + dbPrice) * (servers / 3)).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                Monthly Cost
                            </Typography>

                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Col>
                <Col>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Number of Servers</InputLabel>
                        <Select
                            label="Number of Servers"
                            variant="outlined"
                            disabled={!sizeSelected}
                        >
                            {
                                Object.keys(serverSizes).length > 0 && (

                                    serverSizes[appSize].map(p => {
                                        return <MenuItem
                                            value={p}
                                            selected onClick={(e) => {
                                                setServers(p)
                                            }}
                                        >
                                            {p}
                                        </MenuItem>
                                    }
                                    )
                                )
                            }

                        </Select>
                    </FormControl>
                    <Card>

                        <CardHeader
                            title='PaaS'
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{
                                align: 'center',
                            }}
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'light'
                                        ? theme.palette.grey[200]
                                        : theme.palette.grey[700],
                            }}
                            action={
                                <Button title="Add PaaS Options" variant="contained"
                                    onClick={() => TestToggle(2)}

                                ><AddIcon sx={{ color: 'white' }}></AddIcon></Button>
                            }
                        />


                        <CardContent>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Website Tier</InputLabel>
                                <Select
                                    label="Website Tier"
                                    variant="outlined"
                                >
                                    {
                                        paasWeb.map(e => {
                                            return <MenuItem value={e.pwid} onClick={() => setWebsitePrice(e.cost)}>{e.name}, {e.cpu} Core, {e.ram} GB RAM, {e.storage} GB STORAGE, Price: {e.cost}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">AppService Tier</InputLabel>
                                <Select
                                    label="AppService Tier"
                                    variant="outlined"
                                >
                                    {
                                        paasApp.map(e => {
                                            return <MenuItem value={e.paid} onClick={() => setAppservicePrice(e.cost)}>{e.name} {e.cpu} Core, {e.ram} GB RAM, {e.storage} GB STORAGE, Price: {e.cost}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Database Tier</InputLabel>
                                <Select
                                    label="Database Tier"
                                    variant="outlined"
                                >
                                    {
                                        paasDb.map(e => {
                                            return <MenuItem value={e.pdid} onClick={() => setDatabasePrice(e.cost)}>{e.type}, {e.hardware}, {e.storage} {e.instance}, Price: {e.cost}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>


                            <Typography variant="h4" align="center">
                                ${(websitePrice).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                Web Cost
                            </Typography>

                            <Typography variant="h4" align="center">
                                ${(appservicePrice).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                API Cost
                            </Typography>

                            <Typography variant="h4" align="center">
                                ${(databasePrice).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                DB Cost
                            </Typography>


                            <Typography variant="h3" align="center">
                                ${((websitePrice + appservicePrice + databasePrice)).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                Per Instance
                            </Typography>



                            <Typography variant="h6" align="center">
                                {(instances).toLocaleString()} Instance{Math.abs(instances) != 1 ? 's' : ''}
                            </Typography>
                            <div align="center">

                                <IconButton color="primary" title={(instances > 1) ? "Remove Instances" : "Cannot Have Less Than One Instance"} style={{ backgroundColor: ((instances > 1) ? 'white' : '#e8e8e8') }}
                                    onClick={() => { if (instances > 1) { setInstances((instances - 1)) } }}
                                >
                                    <RemoveIcon fontSize="small" sx={{ color: ((instances > 1) ? '#FF5800' : 'darkgray') }} />
                                </IconButton>&nbsp;
                                <IconButton color="primary" title="Add Instances" style={{ backgroundColor: 'white' }}
                                    onClick={() => setInstances((instances + 1))}>
                                    <AddIcon fontSize="small" sx={{ color: '#FF5800' }} />
                                </IconButton>

                            </div>



                            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={12} md={1}>
                                <b>=</b>
                            </Grid>

                            <Typography variant="h3" align="center">
                                ${((websitePrice + appservicePrice + databasePrice) * instances).toLocaleString()}
                            </Typography>
                            <Typography variant="h6" align="center" color="text.secondary">
                                Monthly Cost
                            </Typography>


                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>

                </Col>
            </Row>












            {
                getToggle() > 0 && (
                    <AddPopup
                        createMode={getToggle()}

                    />
                )

            }
            {
                false && (
                    <>
                        <TextField style={{ flexGrow: '1', marginLeft: '10px' }} id="outlined-basic" label="Toggle Value" onChange={(e) => setVal(e.target.value)} variant="outlined" />

                        <Button variant="outlined" onClick={() => TestToggle(testVal)}>Push Value</Button>&nbsp;&nbsp;
                        <Button variant="outlined" onClick={() => alert(getToggle())}>Get Toggle</Button>&nbsp;&nbsp;

                        {
                            getToggle() == 4 && (
                                <TestComponent />

                            )
                        }
                    </>
                )
            }
            <Button variant="outlined" onClick={() => editRecord()}>Put Value</Button>&nbsp;&nbsp;










        </React.Fragment >
    );
}

export default function Pricing() {
    return <PricingContent />;
}