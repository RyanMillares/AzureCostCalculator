import * as React from 'react';
import axios from 'axios';

import { useState, useEffect } from 'react';

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
import FormControl from '@mui/material/FormControl';

import EditForm from './EditForm';
import { getToggle, setToggle } from '../ToggleContext'
import globalnames from '../globalvars.json'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function EditPopup({ createMode }) {

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
    const AllOptions = {
        'Web Tier': 'IaaSWeb',
        'API Tier': 'IaaSApi',
        'Database Tier': 'IaaSDB',
        'Website Tier': 'PaaSWeb',
        'AppService Tier': 'PaaSApp',
        'Database Tier': 'PaaSDB'

    }
    const IaasOptions = {
        'Web Tier': 'IaaSWeb',
        'API Tier': 'IaaSApi',
        'Database Tier': 'IaaSDB'
    }
    const PaasOptions = {
        'Website Tier': 'PaaSWeb',
        'AppService Tier': 'PaaSApp',
        'Database Tier': 'PaaSDB'
    }
    const inputNames = {
        'IaaSWeb': ['VM', 'CPU', 'RAM', 'Storage', 'Cost'],
        'IaaSApi': ['VM', 'CPU', 'RAM', 'Storage', 'Cost'],
        'IaaSDB': ['VM', 'CPU', 'RAM', 'Storage', 'Cost'],
        'PaaSWeb': ['Name', 'CPU', 'RAM', 'Storage', 'Cost'],
        'PaaSApp': ['Name', 'CPU', 'RAM', 'Storage', 'Cost'],
        'PaaSDB': ['Type', 'Hardware', 'Storage', 'Instance', 'Cost']
    }
    const idNames = {
        'IaaSWeb': 'iwid',
        'IaaSApi': 'iaid',
        'IaaSDB': 'idid',
        'PaaSWeb': 'pwid',
        'PaaSApp': 'paid',
        'PaaSDB': 'pdid'
    }

    const [serverSizes, setSizes] = useState({})
    const [selectedOption, setOption] = useState("")
    const [selectedTier, setTier] = useState({})

    const [data, setData] = useState({})

    
    // chooses which option to pull tiers from (paasweb, paasdb, etc)
    function changeOption(category) {
        setTier({})

        setOption(AllOptions[category])
        console.log(AllOptions[category])
    }
    

    useEffect(() => {
        // find future solution for rerendering
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
            setData({
                'IaaSApi': values[0].data.sort((a, b) => a.cost - b.cost),
                'IaaSDB': values[1].data.sort((a, b) => a.cost - b.cost),
                'IaaSWeb': values[2].data.sort((a, b) => a.cost - b.cost),
                'PaaSApp': values[3].data.sort((a, b) => a.cost - b.cost),
                'PaaSDB': values[4].data.sort((a, b) => a.cost - b.cost),
                'PaaSWeb': values[5].data.sort((a, b) => a.cost - b.cost)



            })
   
            //setServerSizes(values[6].data);
        })

    }, [])
    return (
        
        <Card style={{

            boxShadow: 'none'

        }}>
            <CardHeader
                title={createMode == 1 ? 'Edit Lift-and-Shift Options' : 'Edit PaaS Options'}
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
                                            return <MenuItem value={category} onClick={() => changeOption(category)}>{category}</MenuItem>
                                        })
                                    )

                                }
                                {
                                    createMode == 2 && (
                                        Object.keys(PaasOptions).map(category => {
                                            return <MenuItem value={category} onClick={() => changeOption(category)}>{category}</MenuItem>
                                        })
                                    )
                                }

                            </Select>
                        </FormControl>
                    </Grid>


                </Grid>
                <br />
                {
                    selectedOption.length > 0 && (
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
                                    Select an Option: </Typography>

                            </Grid>
                            <Grid item style={{ flexGrow: '5' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Option</InputLabel>
                                    <Select
                                        label="Option"
                                        variant="outlined"
                                    >
                                        {
                                            data[selectedOption].map(tier => {
                                                return <MenuItem value={tier[inputNames[selectedOption][0].toLowerCase()] + ", " + "$" + tier.cost + tier[idNames[selectedOption].toLowerCase()]} onClick={() => setTier(tier)}>{tier[inputNames[selectedOption][0].toLowerCase()] + ", " + "$" + tier.cost}</MenuItem>

                                            })


                                        }


                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>

                    )

                }
                {
                    Object.keys(selectedTier).length != 0 && (
                        <>
                            <EditForm
                                data={selectedTier}
                                option={selectedOption}
                            />
                        </>
                        )

                }

                <Grid container sx={{ mt: 2 }}>
                    <Grid item xs={12} md={12}>

                        <Typography variant="h6" align="center" color="text.secondary">
                            
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        )
}