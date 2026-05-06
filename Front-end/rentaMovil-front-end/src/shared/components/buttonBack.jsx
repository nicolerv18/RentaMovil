import React from 'react';
import "./buttonBack.css";
import {FaArrowLeft} from "react-icons/fa";

const ButtonBack = ({ onClick, type = 'button', variant = 'normal' }) => {
    return(
        <button className={`buttonBack ${variant}`} onClick={onClick} type={type}>
            <FaArrowLeft /> Regresar
        </button>
    )
}
export default ButtonBack;