import { useState } from "react";

import NavbarTwo from "../../../shared/components/layout/NavbarTwo.jsx";
import FooterTwo from "../../../shared/components/layout/FooterTwo.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

import './Login.css';

function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <>
            <NavbarTwo />

            <div className="login-container">

                {/* Botón para cambiar */}
                <div className="btn">
                    <button
                        className={`auth-toggle-btn ${!isLoginMode ? 'active' : ''}`}
                        onClick={() => setIsLoginMode(!isLoginMode)}
                    >
                        {isLoginMode ? 'Crear cuenta' : 'Iniciar sesión'}
                    </button>
                </div>

                {/* Formularios */}
                <div className="login-form-container">
                    {isLoginMode ? (
                        <LoginForm
                            onSubmit={async (data) => {
                                console.log("Login:", data);
                            }}
                        />
                    ) : (
                        <RegisterForm
                            onSubmit={async (data) => {
                                console.log("Registro:", data);
                            }}
                        />
                    )}
                </div>

            </div>

            <FooterTwo />
        </>
    );
}

export default Login;