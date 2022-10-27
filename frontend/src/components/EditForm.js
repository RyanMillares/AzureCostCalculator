import * as React from 'react';
import axios from 'axios';
import globalnames from '../globalvars.json'

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function EditPopup({ data, option }) {

    const [editing, setEdit] = useState(false)
    const [uuid, setUuid] = useState("")
    const [inputFirst, setFirst] = useState("")
    const [inputSecond, setSecond] = useState("")
    const [inputThird, setThird] = useState("")
    const [inputFourth, setFourth] = useState("")
    const [inputFifth, setFifth] = useState("")
    const [editFirst, setFirstEdit] = useState("")
    const [editSecond, setSecondEdit] = useState("")
    const [editThird, setThirdEdit] = useState("")
    const [editFourth, setFourthEdit] = useState("")
    const [editFifth, setFifthEdit] = useState("")
    const inputNames = {
        'IaaSWeb': ['IWID', 'VM', 'CPU', 'RAM', 'Storage', 'Cost'],
        'IaaSApi': ['IAID', 'VM', 'CPU', 'RAM', 'Storage', 'Cost'],
        'IaaSDB': ['IDID', 'VM', 'CPU', 'RAM', 'Storage', 'Cost'],
        'PaaSWeb': ['PWID', 'Name', 'CPU', 'RAM', 'Storage', 'Cost'],
        'PaaSApp': ['PAID', 'Name', 'CPU', 'RAM', 'Storage', 'Cost'],
        'PaaSDB': ['PDID', 'Type', 'Hardware', 'Storage', 'Instance', 'Cost']
    }

    function switchToEdit() {
        // initialize edit values with current inputs
        setEdit(true)
        setFirstEdit(inputFirst)
        setSecondEdit(inputSecond)
        setThirdEdit(inputThird)
        setFourthEdit(inputFourth)
        setFifthEdit(inputFifth)
        // change editing to true
        // 
    }
    function switchToView() {
        // reset edit values
        setEdit(false)
        setFirstEdit("")
        setSecondEdit("")
        setThirdEdit("")
        setFourthEdit("")
        setFifthEdit("")

    }
    function resetFields() {
        setFirstEdit(inputFirst)
        setSecondEdit(inputSecond)
        setThirdEdit(inputThird)
        setFourthEdit(inputFourth)
        setFifthEdit(inputFifth)
    }

    // Confirm Edit button should call this
    function submitEdit() {
        const apiServerNameObj = JSON.stringify(globalnames);

        const name = JSON.parse(apiServerNameObj);
        const apiServerName = name.serverName;
        let putUrl = "https://" + apiServerName + ":7056/api/" + option;
        const newEdits = [uuid, editFirst, editSecond, editThird, editFourth, editFifth]

        let putObj = {}
        
        inputNames[option].forEach((label, index) => {
            putObj[label] = newEdits[index]
        })
        console.log(putObj)
        axios.put(putUrl, putObj)

        alert("Some notification about editing")
        switchToView()
    }
    function verifyLeaveEdit() {
        if (window.confirm("Are you sure you want to go back? Data will not be saved.")) {
            switchToView()

        }
    }
    // return true if no changes were made
    function noChangesMade() {
        return (editFirst == inputFirst &&
            editSecond == inputSecond &&
            editThird == inputThird && 
            editFourth == inputFourth &&
            editFifth == inputFifth
            )
    }
    function validToSubmit(option) {
        // return to this and validate even harder
        switch (option) {
            case "PaaSWeb":
                return (editFirst.length > 0 &&
                    (!isNaN(editSecond) && editSecond > 0) &&
                    (!isNaN(editThird) && editThird > 0) &&
                    (!isNaN(editFourth) && editFourth > 0) &&
                    (!isNaN(editFifth) && editFifth > 0))

            case "PaaSApp":
                return (editFirst.length > 0 &&
                    (!isNaN(editSecond) && editSecond > 0) &&
                    (!isNaN(editThird) && editThird > 0) &&
                    (!isNaN(editFourth) && editFourth > 0) &&
                    (!isNaN(editFifth) && editFifth > 0))
            case "PaaSDB":
                return (editFirst.length > 0 &&
                    (editSecond.length > 0) &&
                    (editThird.length > 0) &&
                    (editFourth.length > 0) &&
                    (!isNaN(editFifth) && editFifth > 0))

            // NOTE: IaaS VMs have a specific char limit, IMPLEMENT THIS then delete this comment
            case "IaaSWeb":
                return ((editFirst.length > 0 && editFirst.length < 8) &&
                    (!isNaN(editSecond) && editSecond > 0) &&
                    (!isNaN(editThird) && editThird > 0) &&
                    (!isNaN(editFourth) && editFourth > 0) &&
                    (!isNaN(editFifth) && editFifth > 0))
            case "IaaSApi":
                return ((editFirst.length > 0 && editFirst.length < 8) &&
                    (!isNaN(editSecond) && editSecond > 0) &&
                    (!isNaN(editThird) && editThird > 0) &&
                    (!isNaN(editFourth) && editFourth > 0) &&
                    (!isNaN(editFifth) && editFifth > 0))
            case "IaaSDB":
                return ((editFirst.length > 0 && editFirst.length < 8) &&
                    (!isNaN(editSecond) && editSecond > 0) &&
                    (!isNaN(editThird) && editThird > 0) &&
                    (!isNaN(editFourth) && editFourth > 0) &&
                    (!isNaN(editFifth) && editFifth > 0))
            default:
                return false
        }
    }



    useEffect(() => {
        setUuid(data[inputNames[option][0].toLowerCase()])
        setFirst(data[inputNames[option][1].toLowerCase()])
        setSecond(data[inputNames[option][2].toLowerCase()])
        setThird(data[inputNames[option][3].toLowerCase()])
        setFourth(data[inputNames[option][4].toLowerCase()])
        setFifth(data[inputNames[option][5].toLowerCase()])

    }, [data, option])
    return (
        <>


            <Grid>
                <br />
                <Typography sx={{
                    fontFamily: 'Segoe UI Light',
                    fontWeight: 'bold',
                    verticalAlign: 'middle',
                    textAlign: 'center',

                }}>
                    {editing ? ('Editing ' + inputFirst) : 'Tier Summary'} </Typography>
            </Grid><br />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr', gridRowGap: editing ? '1em' : '2em', gridColumnGap: '1em' }}>


                <Grid style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Typography sx={{
                        fontFamily: 'Segoe UI Light',
                        verticalAlign: 'middle',
                        textAlign: 'center',

                    }}>
                        {inputNames[option][1]}: </Typography>&nbsp;
                    {
                        editing ? (
                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" value={editFirst} label={inputNames[option][1]} onChange={(e) => setFirstEdit(e.target.value)} variant="outlined" />

                        ) : (
                            <Typography sx={{
                                fontFamily: 'Segoe UI Light',
                                verticalAlign: 'middle',
                                textAlign: 'center',

                            }}>
                                {inputFirst} </Typography>
                        )
                    }
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
                        {inputNames[option][2]}: </Typography>&nbsp;
                    {
                        editing ? (
                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" value={editSecond} label={inputNames[option][2]} onChange={(e) => setSecondEdit(e.target.value)} variant="outlined" />

                        ) : (
                            <Typography sx={{
                                fontFamily: 'Segoe UI Light',
                                verticalAlign: 'middle',
                                textAlign: 'center',

                            }}>
                                {inputSecond} </Typography>
                        )
                    }
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
                        {inputNames[option][3]}: </Typography>&nbsp;
                    {
                        editing ? (
                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" value={editThird} label={inputNames[option][3]} onChange={(e) => setThirdEdit(e.target.value)} variant="outlined" />

                        ) : (
                            <Typography sx={{
                                fontFamily: 'Segoe UI Light',
                                verticalAlign: 'middle',
                                textAlign: 'center',

                            }}>
                                {inputThird} </Typography>
                        )
                    }
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
                        {inputNames[option][4]}: </Typography>&nbsp;
                    {
                        editing ? (
                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" value={editFourth} label={inputNames[option][4]} onChange={(e) => setFourthEdit(e.target.value)} variant="outlined" />

                        ) : (
                            <Typography sx={{
                                fontFamily: 'Segoe UI Light',
                                verticalAlign: 'middle',
                                textAlign: 'center',

                            }}>
                                {inputFourth} </Typography>
                        )
                    }
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
                        {inputNames[option][5]}: </Typography>&nbsp;
                    {
                        editing ? (
                            <TextField style={{ flexGrow: '1' }} id="outlined-basic" value={editFifth} label={inputNames[option][5]} onChange={(e) => setFifthEdit(e.target.value)} variant="outlined" />

                        ) : (
                            <Typography sx={{
                                fontFamily: 'Segoe UI Light',
                                verticalAlign: 'middle',
                                textAlign: 'center',

                            }}>
                                {inputFifth} </Typography>
                        )
                    }
                </Grid>

            </div>
            <Grid style={{ float: 'right' }}><br/>
                {
                    editing ? (
                        <>
                            <Button variant="outlined" onClick={() => {
                                if (noChangesMade()) {
                                    switchToView()
                                }
                                else {
                                    verifyLeaveEdit()

                                }
                            }}>Back to Summary</Button>
                            &nbsp;&nbsp;
                            <Button variant="outlined" onClick={() => resetFields()}>Reset</Button>
                            &nbsp;&nbsp;
                            <Button variant="contained" disabled={validToSubmit(option) ? '' : 'disabled'} onClick={() => submitEdit()}>Confirm Edit</Button>

                        </>

                    ) : (
                        <Button variant="contained" disabled={(/test/.test(inputFirst.toLowerCase())) ? '' : 'disabled'} onClick={() => switchToEdit()}>Edit Option</Button>

                    )

                }

            </Grid>



        </>

    )
}
