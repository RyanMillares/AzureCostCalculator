import * as React from 'react';
import axios from 'axios';

import { useState, useEffect, useRef } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
import '../styles.css';
import AddPopup from '../components/AddPopup';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
            <div className="dropdown dropdown-6">
                <div>
                   ...
                </div>
                <div class="dropdown_menu dropdown_menu--animated dropdown_menu-6">
                    <div class="dropdown_item-2 responsive_text4" id="fillerItem"><Popup

                        trigger={
                            <Button title={'Add ' + (state == 1 ? 'Lift-And-Shift' : 'PaaS') + ' Options'} variant="contained"
                            //onClick={() => TestToggle(2)}

                            ><AddIcon sx={{ color: 'white' }}></AddIcon></Button>
                        }
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal">
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
                    </Popup></div>
                    <div class="dropdown_item-5 responsive_text4" style={{ borderRadius: '0px 0px 10px 10px' }} id="dropItem">
                        <button className="text-white-800" >
                            Edit Options
                        </button>
                    </div>
                </div>
            </div>


            

        </>



    )





}
