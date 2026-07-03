import { useState } from "react";

import NavbarTwo from "../../../shared/components/layout/NavbarTwo.jsx";
import FooterTwo from "../../../shared/components/layout/FooterTwo.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import { useTranslation } from "react-i18next";

import "./Login.css";

function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { t } = useTranslation();    

    return (
        <>
            <NavbarTwo />

            <div className="login-container">

                {/* Formularios */}
                <div className="login-form-container">
                    {isLoginMode ? (
                        <LoginForm
                            onSubmit={async (data) => {
                                console.log("Login:", data);
                            }}
                            onSwitchToRegister={() => setIsLoginMode(false)}
                        />
                    ) : (
                        <RegisterForm
                            onSubmit={async (data) => {
                                console.log("Registro:", data);
                            }}
                            onSwitchToLogin={() => setIsLoginMode(true)}
                        />
                    )}
                </div>

            </div>

            <FooterTwo />
        </>
    );
}

export default Login;