import * as React from 'react';
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

import { getToggle, setToggle } from '../ToggleContext'
import globalnames from '../globalvars.json'

//import * as MUI from '@mui/material'



export default function AddPopup({ createMode }) {

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

    // Handling exchange of visibility modes between components
    const [testVal, setVal] = useState(0)
    const [permVal, setPerm] = useState(0)
    function TestToggle(toggleVal) {

        setToggle(toggleVal)
        setPerm(toggleVal)
    }

    // input fields
    const [inputFirst, setFirst] = useState("")
    const [inputSecond, setSecond] = useState("")
    const [inputThird, setThird] = useState("")
    const [inputFourth, setFourth] = useState("")
    const [inputFifth, setFifth] = useState("")

    // options to dynamically determine names and texts
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
    const [selectedOption, setOption] = useState("")
    const [selectedCategory, setCategory] = useState("")


    // validates whether inputs meet validations for each option
    function validToSubmit(option) {
        // return to this and validate even harder
        switch (option) {
            case "PaaSWeb":
                return (inputFirst.length > 0 &&
                    (!isNaN(inputSecond) && inputSecond > 0) &&
                    (!isNaN(inputThird) && inputThird > 0) &&
                    (!isNaN(inputFourth) && inputFourth > 0) &&
                    (!isNaN(inputFifth) && inputFifth > 0))

            case "PaaSApp":
                return (inputFirst.length > 0 &&
                    (!isNaN(inputSecond) && inputSecond > 0) &&
                    (!isNaN(inputThird) && inputThird > 0) &&
                    (!isNaN(inputFourth) && inputFourth > 0) &&
                    (!isNaN(inputFifth) && inputFifth > 0))
            case "PaaSDB":
                return (inputFirst.length > 0 &&
                    (inputSecond.length > 0) &&
                    (inputThird.length > 0) &&
                    (inputFourth.length > 0) &&
                    (!isNaN(inputFifth) && inputFifth > 0))

            // NOTE: IaaS VMs have a specific char limit, IMPLEMENT THIS then delete this comment
            case "IaaSWeb":
                return (inputFirst.length > 0 &&
                    (!isNaN(inputSecond) && inputSecond > 0) &&
                    (!isNaN(inputThird) && inputThird > 0) &&
                    (!isNaN(inputFourth) && inputFourth > 0) &&
                    (!isNaN(inputFifth) && inputFifth > 0))
            case "IaaSApi":
                return (inputFirst.length > 0 &&
                    (!isNaN(inputSecond) && inputSecond > 0) &&
                    (!isNaN(inputThird) && inputThird > 0) &&
                    (!isNaN(inputFourth) && inputFourth > 0) &&
                    (!isNaN(inputFifth) && inputFifth > 0))
            case "IaaSDB":
                return (inputFirst.length > 0 &&
                    (!isNaN(inputSecond) && inputSecond > 0) &&
                    (!isNaN(inputThird) && inputThird > 0) &&
                    (!isNaN(inputFourth) && inputFourth > 0) &&
                    (!isNaN(inputFifth) && inputFifth > 0))
            default:
                return false
        }
    }
    // posts data to respective database given converted data types
    function submitData(option) {
        const apiServerNameObj = JSON.stringify(globalnames);

        const name = JSON.parse(apiServerNameObj);
        const apiServerName = name.serverName;
        const postUrl = "https://" + apiServerName + ":7056/api/" + option;

        postUrl += "?"

        // currently made for exactly 5 fields
        const inputs = [inputFirst, inputSecond, inputThird, inputFourth, inputFifth]

        // append fields to urlencoded request
        inputNames[selectedOption].forEach(function (field, index) {
            postUrl += (field.toLowerCase() + "=" + inputs[index] + "&")
        })
        // remove the last & at end
        const postString = postUrl.slice(0, -1)
        axios.post(postString)

       
    }

    // sends the data and clears the input fields, then closes the window
    function submitForm() {

        submitData(selectedOption)
        clearAll()
    }

    // sets both the current option and category
    function setOptionAndTitle(category) {
        ClearFields()
        setOption(AllOptions[category])
        setCategory(category)

    }
    // resets all input fields
    function ClearFields() {
        setFirst("")
        setSecond("")
        setThird("")
        setFourth("")
        setFifth("")
    }
    // resets all possible selectable values and closes the popup
    function clearAll() {
        ClearFields()
        setOption("")
        TestToggle(0)
    }

    useEffect(() => {


    }, [getToggle()])

    return (
        <>
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
                    title={getToggle() == 1 ? 'Create Shift-and-Lift Options' : 'Create PaaS Options'}
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
                                        getToggle() == 1 && (
                                            Object.keys(IaasOptions).map(category => {
                                                return <MenuItem value={category} onClick={() => setOption(AllOptions[category])}>{category}</MenuItem>
                                            })
                                        )

                                    }
                                    {
                                        getToggle() == 2 && (
                                            Object.keys(PaasOptions).map(category => {
                                                return <MenuItem value={category} onClick={() => setOption(AllOptions[category])}>{category}</MenuItem>
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
                            <>
                                <Grid>
                                    <Typography sx={{
                                        fontFamily: 'Segoe UI Light',
                                        fontWeight: 'bold',
                                        verticalAlign: 'middle',
                                        textAlign: 'center',

                                    }}>
                                        Add {{selectedCategory}} </Typography>
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
                                            { inputNames[selectedOption][0] } </Typography>&nbsp;
                                        <TextField style={{ flexGrow: '1' }} id="outlined-basic" label={ inputNames[selectedOption][0] } onChange={(e) => setFirst(e.target.value)} variant="outlined" />
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
                                            {inputNames[selectedOption][1] } </Typography>&nbsp;
                                        <TextField style={{ flexGrow: '1' }} id="outlined-basic" label={inputNames[selectedOption][1]} onChange={(e) => setSecond(e.target.value)} variant="outlined" />
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
                                            {inputNames[selectedOption][2] } </Typography>&nbsp;
                                        <TextField style={{ flexGrow: '1' }} id="outlined-basic" label={inputNames[selectedOption][2]} onChange={(e) => setThird(e.target.value)} variant="outlined" />
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
                                            {inputNames[selectedOption][3] } </Typography>&nbsp;
                                        <TextField style={{ flexGrow: '1' }} id="outlined-basic" label={inputNames[selectedOption][3] } onChange={(e) => setFourth(e.target.value)} variant="outlined" />
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
                                            {inputNames[selectedOption][4] } </Typography>&nbsp;
                                        <TextField style={{ flexGrow: '1' }} id="outlined-basic" label={inputNames[selectedOption][4]} onChange={(e) => setFourth(e.target.value)} variant="outlined" />
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

        </>

    )

}

