import * as React from 'react';
import axios from 'axios';

import { useState, useEffect, useRef } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
import '../styles.css';
import AddPopup from '../components/AddPopup';
import EditPopup from '../components/EditPopup';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Typography from '@mui/material/Typography';
import Dropdown from 'react-bootstrap/Dropdown';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';



export default function DropdownMenu({state}) {
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

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // find future solution for rerendering

    }, [])

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" style={{ backgroundColor: '#FF5800', border: 'none', boxShadow:  '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}} id="dropdown-basic">
                    <SettingsIcon sx={{ color: 'white' }}></SettingsIcon> 
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item><Popup

                        trigger={
                            <div title={'Add ' + (state == 1 ? 'Lift-And-Shift' : 'PaaS') + ' Options'}>
                                <AddIcon sx={{ color: '#FF5800' }}></AddIcon> <a style={{ fontFamily: "Segoe UI Light", color: '#FF5800' }}> Add Options</a>
                            </div>
                        }
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal1">
                                <button className="close" onClick={close} >
                                    &times;
                                </button>
                                <AddPopup
                                    createMode={state}

                                />

                                <br />
                                {
                                    false && (
                                        <div className="actions" >

                                            <Button
                                                variant="outlined"
                                                className="button"
                                                onClick={() => {
                                                    console.log('modal closed ');
                                                    close();
                                                }}
                                            >
                                                close modal
                                            </Button>
                                        </div>

                                    )
                                }
                            </div>
                        )}
                    </Popup></Dropdown.Item>
                    <Dropdown.Item><Popup

                        trigger={
                            <div title={'Edit ' + (state == 1 ? 'Lift-And-Shift' : 'PaaS') + ' Options'}>
                                <CreateIcon sx={{ color: '#FF5800' }}></CreateIcon> <a style={{ fontFamily: "Segoe UI Light", color: '#FF5800' }}> Edit Options</a>
                            </div>
                        }
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal1">
                                <button className="close" onClick={close} >
                                    &times;
                                </button>
                                <EditPopup
                                    createMode={state}

                                />

                                <br />
                                {
                                    false && (
                                        <div className="actions" >

                                            <Button
                                                variant="outlined"
                                                className="button"
                                                onClick={() => {
                                                    console.log('modal closed ');
                                                    close();
                                                }}
                                            >
                                                close modal
                                            </Button>
                                        </div>

                                    )
                                }
                            </div>
                        )}
                    </Popup></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
         


            

        </>



    )





}
