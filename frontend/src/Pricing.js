import * as React from 'react';
import { useState, useEffect } from 'react';
import useForceUpdate from 'use-force-update';

import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
//import Avatar from '@mui/material/Avatar';
import Logo from './AvanadeLogo.png';

import { getToggle, setToggle } from './ToggleContext'
import TestComponent from './components/TestComponent'

import FormControl from '@mui/material/FormControl';
//import NetworkInfo from 'react-native-network-info';

//import globalnames from './globalvars.json' assert {type: 'json' };
import globalnames from './globalvars.json'
import AddPopup from './components/AddPopup'

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
    const [selectedOption, setOption] = useState("")

    // PaaS Website Fields
    const [PaasWebName, setPaasWebName] = useState("")
    const [PaasWebRam, setPaasWebRam] = useState(0)
    const [PaasWebCpu, setPaasWebCpu] = useState(0)
    const [PaasWebStorage, setPaasWebStorage] = useState(0)
    const [PaasWebCost, setPaasWebCost] = useState(0)

    // PaaS AppService Fields
    const [PaasAppName, setPaasAppName] = useState("")
    const [PaasAppRam, setPaasAppRam] = useState(0)
    const [PaasAppCpu, setPaasAppCpu] = useState(0)
    const [PaasAppStorage, setPaasAppStorage] = useState(0)
    const [PaasAppCost, setPaasAppCost] = useState(0)

    // PaaS Database Fields
    const [PaasDbType, setPaasDbType] = useState("")
    const [PaasDbHardware, setPaasDbHardware] = useState("")
    const [PaasDbStorage, setPaasDbStorage] = useState("")
    const [PaasDbInstance, setPaasDbInstance] = useState("")
    const [PaasDbCost, setPaasDbCost] = useState(0)

    // IaaS Web Fields
    const [IaasWebVm, setIaasWebVm] = useState("")
    const [IaasWebRam, setIaasWebRam] = useState(0)
    const [IaasWebCpu, setIaasWebCpu] = useState(0)
    const [IaasWebStorage, setIaasWebStorage] = useState(0)
    const [IaasWebCost, setIaasWebCost] = useState(0)

    // IaaS API Fields
    const [IaasApiVm, setIaasApiVm] = useState("")
    const [IaasApiRam, setIaasApiRam] = useState(0)
    const [IaasApiCpu, setIaasApiCpu] = useState(0)
    const [IaasApiStorage, setIaasApiStorage] = useState(0)
    const [IaasApiCost, setIaasApiCost] = useState(0)

    // IaaS Database Fields
    const [IaasDbVm, setIaasDbVm] = useState("")
    const [IaasDbRam, setIaasDbRam] = useState(0)
    const [IaasDbCpu, setIaasDbCpu] = useState(0)
    const [IaasDbStorage, setIaasDbStorage] = useState(0)
    const [IaasDbCost, setIaasDbCost] = useState(0)

    const [testVal, setVal] = useState(0)
    const [permVal, setPerm] = useState(0)

    function clearAll() {
        setOption("")
        setMode(0)
        TestToggle(0)
        clearPaasFields()
        clearIaasFields()
    }


    function clearPaasFields() {
        setIaasWebVm("")
        setIaasWebCost(0)
        setIaasWebRam(0)
        setIaasWebStorage(0)
        setIaasWebCpu(0)

        setIaasApiVm("")
        setIaasApiCost(0)
        setIaasApiRam(0)
        setIaasApiStorage(0)
        setIaasApiCpu(0)

        setIaasDbVm("")
        setIaasDbCost(0)
        setIaasDbRam(0)
        setIaasDbStorage(0)
        setIaasDbCpu(0)
    }
    function clearIaasFields() {
        setPaasWebName("")
        setPaasWebCost(0)
        setPaasWebRam(0)
        setPaasWebStorage(0)
        setPaasWebCpu(0)

        setPaasAppName("")
        setPaasAppCost(0)
        setPaasAppRam(0)
        setPaasAppStorage(0)
        setPaasAppCpu(0)

        setPaasDbCost(0)
        setPaasDbHardware("")
        setPaasDbInstance("")
        setPaasDbType("")
        setPaasDbStorage("")
    }
    function validToSubmit(option) {
        // return to this and validate even harder
        switch (option) {
            case "PaaSWeb":
                return (PaasWebName.length > 0 &&
                    (!isNaN(PaasWebCost) && PaasWebCost > 0) &&
                    (!isNaN(PaasWebRam) && PaasWebRam > 0) &&
                    (!isNaN(PaasWebStorage) && PaasWebStorage > 0) &&
                    (!isNaN(PaasWebCpu) && PaasWebCpu > 0))

            case "PaaSApp":
                return (PaasAppName.length > 0 &&
                    (!isNaN(PaasAppCost) && PaasAppCost > 0) &&
                    (!isNaN(PaasAppRam) && PaasAppRam > 0) &&
                    (!isNaN(PaasAppStorage) && PaasAppStorage > 0) &&
                    (!isNaN(PaasAppCpu) && PaasAppCpu > 0))
            case "PaaSDB":
                return ((!isNaN(PaasDbCost) && PaasDbCost > 0) &&
                    PaasDbHardware.length > 0 && PaasDbInstance.length > 0 && PaasDbStorage.length > 0 && PaasDbType.length > 0)
            case "IaaSWeb":
                return (IaasWebVm.length > 0 &&
                    (!isNaN(IaasWebCost) && IaasWebCost > 0) &&
                    (!isNaN(IaasWebRam) && IaasWebRam > 0) &&
                    (!isNaN(IaasWebStorage) && IaasWebStorage > 0) &&
                    (!isNaN(IaasWebCpu) && IaasWebCpu > 0))
            case "IaaSApi":
                return (IaasApiVm.length > 0 &&
                    (!isNaN(IaasApiCost) && IaasApiCost > 0) &&
                    (!isNaN(IaasApiRam) && IaasApiRam > 0) &&
                    (!isNaN(IaasApiStorage) && IaasApiStorage > 0) &&
                    (!isNaN(IaasApiCpu) && IaasApiCpu > 0))
            case "IaaSDB":
                return (IaasDbVm.length > 0 &&
                    (!isNaN(IaasDbCost) && IaasDbCost > 0) &&
                    (!isNaN(IaasDbRam) && IaasDbRam > 0) &&
                    (!isNaN(IaasDbStorage) && IaasDbStorage > 0) &&
                    (!isNaN(IaasDbCpu) && IaasDbCpu > 0))
            default:
                return false
        }
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
    function submitForm() {
        submitData(selectedOption)
        clearAll()
    }


 

    
    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    

    function submitData(option) {
        const apiServerNameObj = JSON.stringify(globalnames);

        const name = JSON.parse(apiServerNameObj);
        const apiServerName = name.serverName;
        const postUrl = "https://" + apiServerName + ":7056/api/" + option;
        switch (option) {
            // all vars with numbers will be changed to have better names
            case "PaaSWeb":
               
                var newTierString = "name="+PaasWebName + "&cpu="
                    + PaasWebCpu + "&ram=" + PaasWebRam + "&storage=" + PaasWebStorage + "&cost=" + PaasWebCost
        
                let newres = axios.post(postUrl + "?" + newTierString)

                break;

            case "PaaSApp":
                var newTierString1 = "name=" + PaasAppName + "&cpu="
                    + PaasAppCpu + "&ram=" + PaasAppRam + "&storage=" + PaasAppStorage + "&cost=" + PaasAppCost
                let res = axios.post(postUrl + "?" + newTierString1)


                break;
            case "PaaSDB":

                var newTierString2 = "type=" + PaasDbType + "&hardware="
                    + PaasDbHardware + "&instance=" + PaasDbInstance + "&storage=" + PaasDbStorage + "&cost=" + PaasDbCost
                axios.post(postUrl + "?" + newTierString2)
                break;

            case "IaaSWeb":

                var newTierString3 = "vm=" + IaasWebVm + "&cpu="
                    + IaasWebCpu + "&ram=" + IaasWebRam + "&storage=" + IaasWebStorage + "&cost=" + IaasWebCost

                axios.post(postUrl + "?" + newTierString3)
                break;
            case "IaaSApi":
                var newTierString4 = "vm=" + IaasApiVm + "&cpu="
                    + IaasApiCpu + "&ram=" + IaasApiRam + "&storage=" + IaasApiStorage + "&cost=" + IaasApiCost

                axios.post(postUrl + "?" + newTierString4)
                break;
            case "IaaSDB":
                var newTierString5 = "vm=" + IaasDbVm + "&cpu="
                    + IaasDbCpu + "&ram=" + IaasDbRam + "&storage=" + IaasDbStorage + "&cost=" + IaasDbCost

                axios.post(postUrl + "?" + newTierString5)
                break;
            default:
                break;
        }
        alert("New Tier Added!")
        window.location.reload()
    }

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
            <ThemeProvider theme={theme}>
                <AppBar
                    position="static"
                    color="primary"
                    elevation={0}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Azure Cost Calculator
                        </Typography>
                        <img src={Logo} alt="Avanade Logo"/>
                        <IconButton ></IconButton>
                    </Toolbar>
                </AppBar>
                <Container disableGutters maxWidth="md" sx={{ pt: 4, pb: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">App Size</InputLabel>
                                <Select
                                    label="App Size"
                                    variant="outlined"
                                >
                                    {

                                        Object.keys(serverSizes).map(p => {
                                            return <MenuItem
                                                value={p}
                                                selected onClick={(e) => {
                                                    setAppSize(p);
                                                    setSizeSelected(true);
                                                }}
                                            >
                                                {p}
                                            </MenuItem>
                                        }
                                        )}


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                    {
                                        /* this is the old code, for reference
                                         *<MenuItem value={numServers[appSize][0]} onClick={() => setServers(parseInt(numServers[appSize][0]))}>{numServers[appSize][0]}</MenuItem>
                                        this goes 0, 1, 2
                                         * */

                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="xl" component="main">
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardHeader
                                    title="Shift-and-Lift" //IaaS
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ mt: 4 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4" align="center">
                                                ${(webPrice * (servers / 3)).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                Web Cost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4" align="center">
                                                ${(apiPrice * (servers / 3)).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                API Cost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4" align="center">
                                                ${(dbPrice * (servers / 3)).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                DB Cost
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant="h2" align="center">
                                                ${((webPrice + apiPrice + dbPrice) * (servers / 3)).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                Total Cost
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>

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
                                            //disabled={getToggle() != 0} 
                                        ><AddIcon sx={{ color: 'white' }}></AddIcon></Button>
                                    }
                                />





                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                                    {/* <MenuItem value="S1" onClick={() => setAppservicePrice(44)}>Standard - S1 1 Core, 1.75 GB RAM, 50 GB Storage, Price: 44</MenuItem>
                            <MenuItem value="S2" onClick={() => setAppservicePrice(88)}>Standard - S2 2 Cores, 3.5 GB RAM, 50 GB Storage, Price: 88</MenuItem>
                            <MenuItem value="S3" onClick={() => setAppservicePrice(175)}>Standard - S3 4 Cores, 7 GB RAM, 50 GB Storage, Price: 175</MenuItem> */}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
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
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ mt: 4 }}>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4" align="center">
                                                ${(websitePrice).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                Web Cost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4" align="center">
                                                ${(appservicePrice).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                API Cost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="h4" align="center">
                                                ${(databasePrice).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                DB Cost
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant="h2" align="center">
                                                ${((websitePrice + appservicePrice + databasePrice)).toLocaleString()}
                                            </Typography>
                                            <Typography variant="h6" align="center" color="text.secondary">
                                                Total Cost
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        </Grid>
                        {
                            // additional conditions can be applied here to check for admin access in future
                            // change to something perm false when testing component
                            
                        }

                        {
                            getToggle() > 0 && (
                                <AddPopup
                                    createMode={getToggle()}
    
                                />
                                )

                        }
                        <TextField style={{ flexGrow: '1',marginLeft:'10px' }} id="outlined-basic" label="Toggle Value" onChange={(e) => setVal(e.target.value)} variant="outlined" />

                        <Button variant="outlined" onClick={() => TestToggle(testVal)}>Push Value</Button>&nbsp;&nbsp;
                        {
                            getToggle() == 4 && (
                                <TestComponent />

                                )
                        }

                        



                    </Grid>
                </Container>
                
            </ThemeProvider>
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}