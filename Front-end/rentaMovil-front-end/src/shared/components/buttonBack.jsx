import React from 'react';
import "./buttonBack.css";
import {FaArrowLeft} from "react-icons/fa";
import { useTranslation } from "react-i18next";
const ButtonBack = ({ onClick, type = 'button' }) => {
    const { t } = useTranslation();
    return(
        <button className = "buttonBack" onClick={onClick} type={type}>
            <FaArrowLeft /> {t('buttonBack.label')}
        </button>
    )
}
export default ButtonBack;