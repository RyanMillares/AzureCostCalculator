import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
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

    function setServerSizes(sizes) {
        //console.log(sizes)
        const newSizes = new Object()

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
                                                    {/* <MenuItem value="D1_v2" onClick={() => setWebPrice(15)}>D1_v2 CPU: 1, RAM: 3.5 , Storage: 50, Price: 15</MenuItem>
                            <MenuItem value="D2_v3" onClick={() => setWebPrice(27)}>D2_v3 CPU: 2 , RAM: 8 , Storage: 50, Price: 27</MenuItem>
                            <MenuItem value="D4s_v3" onClick={() => setWebPrice(54)}>D4s_v3 CPU: 4 , RAM: 16 , Storage: 32, Price: 54</MenuItem>
                            <MenuItem value="D8s_v3" onClick={() => setWebPrice(107)}>D8s_v3 CPU: 8 , RAM: 32 , Storage: 64, Price: 107</MenuItem>
                            <MenuItem value="D16s_v3" onClick={() => setWebPrice(215)}>D16s_v3 CPU: 16 , RAM: 64 , Storage: 128, Price: 215</MenuItem>
                            <MenuItem value="D32s_v3" onClick={() => setWebPrice(431)}>D32s_v3 CPU: 32 , RAM: 128 , Storage: 256, Price: 431</MenuItem>
                            <MenuItem value="D64s_v3" onClick={() => setWebPrice(861)}>D64s_v3 CPU: 64 , RAM: 256 , Storage: 512, Price: 861</MenuItem> */}
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
                                                    {/* <MenuItem value="F2s_v2" onClick={() => setApiPrice(23)}>F2s_v2 CPU: 2 , RAM: 4 , Storage: 16, Price: 23</MenuItem>
                            <MenuItem value="F4s_v2" onClick={() => setApiPrice(45)}>F4s_v2 CPU: 4 , RAM: 8 , Storage: 32, Price: 45</MenuItem>
                            <MenuItem value="F8s_v2" onClick={() => setApiPrice(91)}>F8s_v2 CPU: 8 , RAM: 16 , Storage: 64, Price: 91</MenuItem>
                            <MenuItem value="F16s_v2" onClick={() => setApiPrice(181)}>F16s_v2 CPU: 16 , RAM: 32 , Storage: 128, Price: 181</MenuItem>
                            <MenuItem value="F32s_v2" onClick={() => setApiPrice(362)}>F32s_v2 CPU: 32 , RAM: 64 , Storage: 256, Price: 362</MenuItem>
                            <MenuItem value="F48s_v2" onClick={() => setApiPrice(534)}>F48s_v2 CPU: 48 , RAM: 96 , Storage: 384, Price: 534</MenuItem>
                            <MenuItem value="F64s_v2" onClick={() => setApiPrice(724)}>F64s_v2 CPU: 64 , RAM: 128 , Storage: 512, Price: 724</MenuItem> */}
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
                                                    {/* <MenuItem value="E2s_v3" onClick={() => setDbPrice(37)}>E2s_v3 CPU: 2 , RAM: 16 , Storage: 32, Price: 37</MenuItem>
                            <MenuItem value="E4s_v5" onClick={() => setDbPrice(79)}>E4s_v5 CPU: 4 , RAM: 32 , Storage: 150, Price: 79</MenuItem>
                            <MenuItem value="E8s_v3" onClick={() => setDbPrice(146)}>E8s_v3 CPU: 8, RAM: 64 , Storage: 128, Price: 146</MenuItem>
                            <MenuItem value="E16s_v3" onClick={() => setDbPrice(292)}>E16s_v3 CPU: 16, RAM: 128 , Storage: 256, Price: 292</MenuItem>
                            <MenuItem value="E32s_v3" onClick={() => setDbPrice(584)}>E32_v3 CPU: 32 , RAM: 256 , Storage: 800, Price: 584</MenuItem> */}
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
                                                            return <MenuItem value={e.pwid} onClick={() => setWebsitePrice(e.cost)}>{e.name} {e.cpu} Core, {e.ram} GB RAM, {e.storage} GB STORAGE, Price: {e.cost}</MenuItem>
                                                        })
                                                    }
                                                    {/* <MenuItem value="S1" onClick={() => setWebsitePrice(44)}>Standard - S1 1 Core, 1.75 GB RAM, 50 GB Storage, Price: 44</MenuItem>
                            <MenuItem value="S2" onClick={() => setWebsitePrice(88)}>Standard - S2 2 Cores, 3.5 GB RAM, 50 GB Storage, Price: 88</MenuItem>
                            <MenuItem value="S3" onClick={() => setWebsitePrice(175)}>Standard - S3 4 Cores, 7 GB RAM, 50 GB Storage, Price: 175</MenuItem> */}
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
                                                    {/* <MenuItem value="RA-GRBS 2" onClick={() => setDatabasePrice(104)}>Single Database, vCore, RA-GRS 2 vCores, Price: 104</MenuItem>
                            <MenuItem value="RA-GRBS 2.1" onClick={() => setDatabasePrice(204)}>Single Database, vCore, RA-GRS 2 vCores, Price: 204</MenuItem>
                            <MenuItem value="RA-GRS 6" onClick={() => setDatabasePrice(304)}>Single Database, vCore, RA-GRS 6 vCores, Price: 304</MenuItem>
                            <MenuItem value="RA-GRS 8" onClick={() => setDatabasePrice(404)}>Single Database, vCore, RA-GRS 8 vCores, Price: 404</MenuItem> */}
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
                    </Grid>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}