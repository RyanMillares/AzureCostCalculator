import * as React from 'react';
import { useState, useEffect } from 'react';
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


    function clearAll() {
        setOption("")
        setMode(0)
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
        switch (option) {
            // all vars with numbers will be changed to have better names
            case "PaaSWeb":
                const newTier = {}
                newTier.pwid = createUUID()
                newTier.name = PaasWebName
                newTier.cpu = parseInt(PaasWebCpu,10)
                newTier.ram = parseInt(PaasWebRam,10)
                newTier.storage = parseInt(PaasWebStorage,10)
                newTier.cost = parseInt(PaasWebCost, 10)
                
                console.log(newTier)
                const tempArray = paasWeb
                tempArray.push(newTier)
                setPaasWeb(tempArray)
                break;

            case "PaaSApp":
                const newTier1 = {}
                newTier1.paid = createUUID()
                newTier1.name = PaasAppName
                newTier1.cpu = parseInt(PaasAppCpu, 10)
                newTier1.ram = parseInt(PaasAppRam, 10)
                newTier1.storage = parseInt(PaasAppStorage, 10)
                newTier1.cost = parseInt(PaasAppCost, 10)

                const tempArray1 = paasApp
                tempArray1.push(newTier1)
                setPaasApp(tempArray1)
                break;
            case "PaaSDB":
                const newTier2 = {}
                newTier2.pdid = createUUID()
                newTier2.type = PaasDbType
                newTier2.hardware = PaasDbHardware
                newTier2.instance = PaasDbInstance
                newTier2.storage = PaasDbStorage
                newTier2.cost = parseInt(PaasDbCost, 10)

                const tempArray2 = paasDb
                tempArray2.push(newTier2)
                setPaasDb(tempArray2)
                break;
            case "IaaSWeb":
                const newTier3 = {}
                newTier3.iwid = createUUID()
                newTier3.vm = IaasWebVm
                newTier3.cpu = parseInt(IaasWebCpu, 10)
                newTier3.ram = parseInt(IaasWebRam, 10)
                newTier3.storage = parseInt(IaasWebStorage, 10)
                newTier3.cost = parseInt(IaasWebCost, 10)

                const tempArray3 = iaasWeb
                tempArray3.push(newTier3)
                setIaasWeb(tempArray3)
                
                break;
            case "IaaSApi":
                const newTier4 = {}
                newTier4.iaid = createUUID()
                newTier4.vm = IaasApiVm
                newTier4.cpu = parseInt(IaasApiCpu, 10)
                newTier4.ram = parseInt(IaasApiRam, 10)
                newTier4.storage = parseInt(IaasApiStorage, 10)
                newTier4.cost = parseInt(IaasApiCost, 10)

                const tempArray4 = iaasApi
                tempArray4.push(newTier4)
                setIaasApi(tempArray4)
                break;
            case "IaaSDB":
                const newTier5 = {}
                newTier5.idid = createUUID()
                newTier5.vm = IaasDbVm
                newTier5.cpu = parseInt(IaasDbCpu, 10)
                newTier5.ram = parseInt(IaasDbRam, 10)
                newTier5.storage = parseInt(IaasDbStorage, 10)
                newTier5.cost = parseInt(IaasDbCost, 10)

                const tempArray5 = iaasDb
                tempArray5.push(newTier5)
                setIaasDb(tempArray5)
                break;
            default:
                break;
        }
    }

    const numServers = {
        'Small': [3, 6, 9],
        'Medium': [12, 15, 18],
        'Large': [21, 24, 27],
        'XL': [30, 33, 36]
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
    }, [])

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
                                        <Button title="Add PaaS Options" variant="contained"
                                            onClick={() => setMode(1)}
                                            disabled={createMode != 0}
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
                                            onClick={() => setMode(2)}
                                            disabled={createMode != 0} 
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
                            createMode != 0 && (
                                <Card style={{

                                    boxShadow: '0 0 0 9999px #000000b0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'auto',
                                    width: '51vw',
                                    backgroundColor: 'white',
                                    borderStyle: 'solid',
                                    borderColor: '#FF8800',
                                    borderWidth: '2px',
                                    borderRadius: '10px',

                                    paddingBottom: '3px',
                                    position: 'absolute',
                                    left: '24vw',
                                    top: '15vh',
                                    zIndex: '1'

                                }}>
                                    <CardHeader
                                        title={createMode == 1 ? 'Create Shift-and-Lift Options' : 'Create PaaS Options' }
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
                                    />

                                    <CardContent>
                                        <Grid style={{
                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }} container spacing={1} >
                                            <Grid>
                                                <Typography sx={{
                                                    fontFamily: 'Segoe UI Light',
                                                    verticalAlign: 'middle',
                                                    textAlign: 'center',


                                                }}>
                                                    Select a Tier: </Typography>

                                            </Grid>
                                            <Grid item style={{ flexGrow: '5' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Tier</InputLabel>
                                                    <Select
                                                        label="Tier"
                                                        variant="outlined"
                                                    >
                                                        {
                                                            createMode == 1 && (
                                                                Object.keys(IaasOptions).map(category => {
                                                                    return <MenuItem value={category} onClick={() => setOption(IaasOptions[category])}>{category}</MenuItem>
                                                                })
                                                            ) 

                                                        }
                                                        {
                                                            createMode == 2 && (
                                                                Object.keys(PaasOptions).map(category => {
                                                                    return <MenuItem value={category} onClick={() => setOption(PaasOptions[category])}>{category}</MenuItem>
                                                                })
                                                            ) 
                                                        }

                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        </Grid>
                                        <br />
                                        {
                                            selectedOption == "PaaSWeb" && (
                                                <>
                                                    <Grid>
                                                        <Typography sx={{
                                                            fontFamily: 'Segoe UI Light',
                                                            fontWeight: 'bold',
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',


                                                        }}>
                                                            Add Website Tier </Typography>
                                                    </Grid><br />

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: '1em', gridColumnGap: '1em' }}>


                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Name </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Name" onChange={(e) => setPaasWebName(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                CPU </Typography>&nbsp;
                                                            <TextField style={{flexGrow: '1'}} id="outlined-basic" label="CPU (Cores)" onChange={(e) => setPaasWebCpu(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                RAM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="RAM (GB)" onChange={(e) => setPaasWebRam(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Storage </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Storage (GB)" onChange={(e) => setPaasWebStorage(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Price </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Cost ($)" onChange={(e) => setPaasWebCost(e.target.value)} variant="outlined" />
                                                        </Grid>

                                                    </div>
                                                </>

                                            )
                                        }
                                        {
                                            selectedOption == "PaaSApp" && (
                                                <>
                                                    <Grid>
                                                        <Typography sx={{
                                                            fontFamily: 'Segoe UI Light',
                                                            fontWeight: 'bold',
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',


                                                        }}>
                                                            Add AppService Tier </Typography>
                                                    </Grid><br />
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: '1em', gridColumnGap: '1em' }}>



                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Name </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Name" onChange={(e) => setPaasAppName(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                CPU </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="CPU (Cores)" onChange={(e) => setPaasAppCpu(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                RAM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="RAM (GB)" onChange={(e) => setPaasAppRam(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                AS Storage </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Storage (GB)" onChange={(e) => setPaasAppStorage(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Price </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Cost ($)" onChange={(e) => setPaasAppCost(e.target.value)} variant="outlined" />
                                                        </Grid>

                                                    </div>
                                                </>

                                            )
                                        }
                                        {
                                            selectedOption == "PaaSDB" && (
                                                <>

                                                    <Grid>
                                                        <Typography sx={{
                                                            fontFamily: 'Segoe UI Light',
                                                            fontWeight: 'bold',
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',


                                                        }}>
                                                            Add Database Tier </Typography>
                                                    </Grid><br />
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: '1em', gridColumnGap: '1em' }}>

                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Type </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Type" onChange={(e) => setPaasDbType(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Hardware </Typography>&nbsp;
                                                            <span><TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Hardware" onChange={(e) => setPaasDbHardware(e.target.value)} variant="outlined" /></span>
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Storage </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Storage" onChange={(e) => setPaasDbStorage(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Instance </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Instance" onChange={(e) => setPaasDbInstance(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Price </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Cost ($)" onChange={(e) => setPaasDbCost(e.target.value)} variant="outlined" />
                                                        </Grid>

                                                    </div>
                                                </>

                                            )
                                        }
                                        {
                                            selectedOption == "IaaSWeb" && (
                                                <>
                                                    <Grid>
                                                        <Typography sx={{
                                                            fontFamily: 'Segoe UI Light',
                                                            fontWeight: 'bold',
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',


                                                        }}>
                                                            Add Web Tier </Typography>
                                                    </Grid><br />
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: '1em', gridColumnGap: '1em' }}>



                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                VM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Virtual Machine" onChange={(e) => setIaasWebVm(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                CPU </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="CPU (Cores)" onChange={(e) => setIaasWebCpu(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                RAM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="RAM (GB)" onChange={(e) => setIaasWebRam(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Web Storage </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Storage (GB)" onChange={(e) => setIaasWebStorage(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Price </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Cost ($)" onChange={(e) => setIaasWebCost(e.target.value)} variant="outlined" />
                                                        </Grid>

                                                    </div>
                                                </>

                                            )
                                        }
                                        {
                                            selectedOption == "IaaSApi" && (
                                                <>
                                                    <Grid>
                                                        <Typography sx={{
                                                            fontFamily: 'Segoe UI Light',
                                                            fontWeight: 'bold',
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',


                                                        }}>
                                                            Add API Tier </Typography>
                                                    </Grid><br />
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: '1em', gridColumnGap: '1em' }}>



                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                VM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Virtual Machine" onChange={(e) => setIaasApiVm(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                CPU </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="CPU (Cores)" onChange={(e) => setIaasApiCpu(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                RAM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="RAM (GB)" onChange={(e) => setIaasApiRam(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Storage </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Storage (GB)" onChange={(e) => setIaasApiStorage(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Price </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Cost ($)" onChange={(e) => setIaasApiCost(e.target.value)} variant="outlined" />
                                                        </Grid>

                                                    </div>
                                                </>

                                            )
                                        }
                                        {
                                            selectedOption == "IaaSDB" && (
                                                <>
                                                    <Grid>
                                                        <Typography sx={{
                                                            fontFamily: 'Segoe UI Light',
                                                            fontWeight: 'bold',
                                                            verticalAlign: 'middle',
                                                            textAlign: 'center',


                                                        }}>
                                                            Add Database Tier </Typography>
                                                    </Grid><br />
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: '1em', gridColumnGap: '1em' }}>



                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Database VM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Virtual Machine" onChange={(e) => setIaasDbVm(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                CPU </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="CPU (Cores)" onChange={(e) => setIaasDbCpu(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                RAM </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="RAM (GB)" onChange={(e) => setIaasDbRam(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Storage </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Storage (GB)" onChange={(e) => setIaasDbStorage(e.target.value)} variant="outlined" />
                                                        </Grid>
                                                        <Grid style={{
                                                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Typography sx={{
                                                                fontFamily: 'Segoe UI Light',
                                                                verticalAlign: 'middle',
                                                                textAlign: 'center',


                                                            }}>
                                                                Price </Typography>&nbsp;
                                                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Cost ($)" onChange={(e) => setIaasDbCost(e.target.value)} variant="outlined" />
                                                        </Grid>

                                                    </div>
                                                </>

                                            )
                                        }



                                        <Grid container sx={{ mt: 2 }}>
                                            <Grid item xs={12} md={12}>

                                                <Typography variant="h6" align="center" color="text.secondary">
                                                    Bottom Text
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid style={{ float: 'right' }}>
                                            <Button variant="outlined" onClick={() => clearAll()}>Close</Button>&nbsp;&nbsp;
                                            <Button variant="contained" disabled={validToSubmit(selectedOption) ? '' : 'disabled'} onClick={() => submitForm()}>Add Option</Button>


                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>

                            )
                        }
                        <TextField style={{ flexGrow: '1' }} id="outlined-basic" label="Toggle Value" onChange={(e) => setVal(e.target.value)} variant="outlined" />

                        <Button variant="outlined" onClick={() => setToggle(testVal)}>Push Value</Button>&nbsp;&nbsp;

                        <TestComponent />

                        



                    </Grid>
                </Container>
                
            </ThemeProvider>
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}