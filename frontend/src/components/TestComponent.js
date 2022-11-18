import * as React from 'react';
import { useState, useEffect } from 'react';
import { getToggle, setToggle } from './ToggleContext'
import Button from '@mui/material/Button';



export default function TestComponent() {

    return (
        <>
            <Button variant="outlined" onClick={() => alert(getToggle())}>Get New Value</Button>&nbsp;&nbsp;

        </>





    )

}

