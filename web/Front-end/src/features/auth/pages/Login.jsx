import { useState } from "react";

import NavbarTwo from "../../../shared/components/layout/NavbarTwo.jsx";
import FooterTwo from "../../../shared/components/layout/FooterTwo.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { saveSession } from "../services/sessionStorage";

import "./Login.css";

function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        const session = await authService.login(credentials);

        saveSession(session);

        navigate(
            session.user.role === "ADMIN"
                ? "/HomeAdmin"
                : "/home",
        );
    };

    const handleRegister = async (formData) => {
        const session = await authService.register(formData);
        saveSession(session);
        navigate(session.user.role === "ADMIN" ? "/HomeAdmin" : "/home");
    };

    return (
        <>
            <NavbarTwo />

            <div className="login-container">

                {/* Formularios */}
                <div className="login-form-container">
                    {isLoginMode ? (
                        <LoginForm
                            onSubmit={handleLogin}
                            onSwitchToRegister={() => setIsLoginMode(false)}
                        />
                    ) : (
                        <RegisterForm
                            onSubmit={handleRegister}
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