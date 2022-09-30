// JavaScript source code
import { createContext, useContext } from "react";
import { useState } from 'react'

const [toggle, setToggle] = useState(0)

export function getToggle() {
    return toggle
}
export function setToggle(newToggle) {
    setToggle(newToggle)
}