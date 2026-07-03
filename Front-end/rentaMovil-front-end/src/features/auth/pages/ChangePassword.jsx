import './ChangePassword.css'
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../../../shared/components/layout/NavBarAdmin";
import Footer from '../../../shared/components/layout/FooterAdmin';
import { useTranslation } from "react-i18next";

function ChangePassword() {
    const { t } = useTranslation();

    // ============================================
    // ESTADOS DEL FORMULARIO
    // ============================================
    // currentPassword: la contraseña actual del usuario (para verificar)
    // password: la nueva contraseña que ingresa el usuario
    // confirmPassword: confirmación de la nueva contraseña
    // loading: indica si se está esperando respuesta del servidor
    // error: mensaje de error si algo falla
    // ============================================
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const isPasswordValid = (pass) => {
        return pass.length >= 8 &&
            /[A-Z]/.test(pass) &&
            /[#@!$%^&*]/.test(pass);
    };

    const passwordsMatch = password === confirmPassword;

    const isValid = isPasswordValid(password) && passwordsMatch && currentPassword.length > 0;

    const getCurrentPasswordClass = () => {
        if (currentPassword.length === 0) return "inputBaseP";
        return "inputBaseP inputValidP";
    };


    const getPasswordClass = () => {
        if (password.length === 0) return "inputBaseP";
        return isPasswordValid(password)
            ? "inputBaseP inputValidP"
            : "inputBaseP inputInvalidP";
    };

    const getConfirmClass = () => {
        if (confirmPassword.length === 0) return "inputBaseP";
        return passwordsMatch
            ? "inputBaseP inputValidP"
            : "inputBaseP inputInvalidP";
    };


    const rules = [
        {
            label: t('changePassword.caracters'),
            valid: password.length >= 8
        },
        {
            label: t('changePassword.specialCaracters'),
            valid: /[#@!$%^&*-.]/.test(password)
        },
        {
            label: t('changePassword.uppercase'),
            valid: /[A-Z]/.test(password)
        }
    ];

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {

            // 1. Reemplaza "http://tu-backend.com/api/auth/change-password"
            //    con tu URL real del backend (ej: http://localhost:3001/api/auth/change-password)
            // 2. Si tu backend requiere token, descomenta la línea de Authorization
            
            const response = await fetch("http://tu-backend.com/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // DESCOMENTA ESTA LÍNEA SI TU BACKEND REQUIERE AUTENTICACIÓN:
                    // "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                // ESTRUCTURA QUE SE ENVÍA AL BACKEND:
                // {
                //   "currentPassword": "MiContraseña123#",
                //   "newPassword": "NuevaContraseña123#",
                //   "confirmPassword": "NuevaContraseña123#"
                // }
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: password,
                    confirmPassword: confirmPassword
                })
            });

            // Si la respuesta no es ok (200-299)
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || t("changePassword.errorPassword"));
            }

            const data = await response.json();
            alert(t("changePassword.successPassword"));

            // Limpiar formulario después de cambio exitoso
            setCurrentPassword("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(err.message || t("changePassword.errorRequest"));
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className='containerP'>
                <div className='cardP'>
                    <div className='formP'>

                        <h2 className='form-labelP-title'>{t("changePassword.title")}</h2>
                        {error && <p className="errorMessageP invalidP">{error}</p>}
                        <div className="inputGroupP">
                            <label className='form-labelP' htmlFor='currentPassword'>
                                {t('changePassword.currentPassword')}
                            </label>
                            <input
                                id='currentPassword'
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={getCurrentPasswordClass()}
                            />
                        </div>
                        <div className="inputGroupP">
                            <label className='form-labelP' htmlFor='newPassword'>
                                {t('changePassword.newPassword')}
                            </label>

                            <div className="inputWrapperP">
                                <input
                                    id='newPassword'
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={getPasswordClass()}
                                />

                                <button
                                    type="button"
                                    className="eyeIconP"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Mostrar u ocultar contraseña"
                                    aria-pressed={showPassword}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash /> }
                                </button>
                            </div>
                        </div>
                        <ul className='list'>
                            {rules.map((rule, index) => (
                                <li
                                    key={index}
                                    className={rule.valid ? "validP" : "invalidP"}
                                >
                                    {rule.label}
                                </li>
                            ))}
                        </ul>
                        <div className="inputGroupP">
                            <label className='form-labelP' htmlFor='confirmPassword'>
                                {t('changePassword.confirmPassword')}
                            </label>

                            <div className="inputWrapperP">
                                <input
                                    id='confirmPassword'
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={getConfirmClass()}
                                />

                                <button
                                    type="button"
                                    className="eyeIconP"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    aria-label="Mostrar u ocultar confirmación"
                                    aria-pressed={showConfirm}
                                >
                                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {confirmPassword.length > 0 && !passwordsMatch && (
                                <p className="errorMessageP invalidP">
                                    {t('changePassword.invalid')}
                                </p>
                            )}
                        </div>

                        <button
                            type='button'
                            className='buttonP'
                            disabled={!isValid || loading}
                            onClick={handleChangePassword}
                        >
                            {loading ? t('changePassword.saving') : t('changePassword.save')}
                        </button>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ChangePassword;