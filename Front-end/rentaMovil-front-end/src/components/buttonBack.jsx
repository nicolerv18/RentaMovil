import React from 'react';
import "./buttonBack.css";
import {FaArrowLeft} from "react-icons/fa";
const buttonBack = ({ onClick, type = 'button' }) => {
    return(
        <button className = "buttonBack" onClick={onClick} type={type}>
            <FaArrowLeft /> Regresar
        </button>
    )
}
export default buttonBack;