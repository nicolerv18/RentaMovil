import NavbarTwo from "../components/NavbarTwo";
import Footer from "../components/Footer";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../shared/components/layout/RegisterForm";
import { useState } from "react";
import "./Login.css"


function Login(){
  const [isLoginMode, setIsLoginMode] = useState(true);

return(
    <>
    <NavbarTwo/>
    <div className="login-container">
              <div className="btn">
          <button
            className={`auth-toggle-btn ${!isLoginMode ? 'active' : ''}`}
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </div>
      <div className="login-form-container">
        {isLoginMode ? (
          <LoginForm
            onSubmit={async (data) => {
              console.log("Datos recibidos:", data);
            }}
          />
        ) : (
          <RegisterForm
            onSubmit={async (data) => {
              console.log("Crear cuenta:", data);
            }}
          />
        )}
      </div>
    </div>
    <Footer/>
    </>
);
}


export default Login;
