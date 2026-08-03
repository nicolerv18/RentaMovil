import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarTwo from "../../../shared/components/layout/NavbarTwo.jsx";
import FooterTwo from "../../../shared/components/layout/FooterTwo.jsx";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/AuthContext.jsx";

import "./Login.css";

function Login() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleLogin = async (data) => {
        const user = login(data);
        navigate("/home");
        return user;
    };

    const handleRegister = async (data) => {
        const user = register(data);
        navigate("/home");
        return user;
    };

    return (
        <>
            <NavbarTwo />

            <div className="login-container">
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