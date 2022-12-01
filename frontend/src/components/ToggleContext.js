// JavaScript source code
import { createContext, useContext } from "react";
import { useState } from 'react'

let toggle = 0
let addObject = {}


export function getToggle() {
    return toggle
}
export function setToggle(newToggle) {
    toggle = newToggle
}

export function getObject() {
    return addObject
}
export function setObject(object) {
    addObject = {}
    addObject = object
}



