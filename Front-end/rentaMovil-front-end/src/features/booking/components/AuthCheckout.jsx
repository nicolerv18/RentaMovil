import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import "./AuthCheckout.css";

export default function AuthCheckout({ onAuthSuccess }) {
  const { currentUser, login, register, logout, isAuthenticated } = useAuth();
  const [step, setStep] = useState("CHECK_EMAIL");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setStep("LOGGED_IN");
      if (onAuthSuccess) onAuthSuccess(currentUser);
      return;
    }

    setStep("CHECK_EMAIL");
  }, [currentUser, isAuthenticated, onAuthSuccess]);

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const normalizedEmail = email.trim().toLowerCase();
    const storedUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const existe = storedUsers.some((u) => String(u.email || "").trim().toLowerCase() === normalizedEmail);

    if (existe) {
      setStep("LOGIN");
      setErrorMessage("");
    } else {
      setStep("REGISTER");
      setErrorMessage("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const user = login({ email, password });
      setStep("LOGGED_IN");
      if (onAuthSuccess) onAuthSuccess(user);
    } catch (error) {
      setErrorMessage(error.message || "No se pudo iniciar sesión");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Ingresa un correo válido");
      return;
    }

    if (!nombre.trim()) {
      setErrorMessage("El nombre es obligatorio");
      return;
    }

    if (!/^[0-9]{10}$/.test(telefono)) {
      setErrorMessage("El teléfono debe tener 10 dígitos");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const user = register({
        nombre,
        email,
        password,
        telefono,
      });
      setStep("LOGGED_IN");
      if (onAuthSuccess) onAuthSuccess(user);
    } catch (error) {
      setErrorMessage(error.message || "No se pudo crear la cuenta");
    }
  };

  const handleLogout = () => {
    logout();
    setEmail("");
    setPassword("");
    setNombre("");
    setTelefono("");
    setErrorMessage("");
    setStep("CHECK_EMAIL");
    if (onAuthSuccess) onAuthSuccess(null);
  };

  return (
    <div className="auth-card-container">
      {/* VISTA 1: SI YA ESTÁ LOGUEADO */}
      {step === "LOGGED_IN" && currentUser && (
        <div className="auth-step user-logged-box">
          <div className="user-logged-info">
            <span className="user-badge">✓ Sesión Activa</span>
            <h3>Bienvenido, {currentUser.nombre}</h3>
            <p><strong>Correo:</strong> {currentUser.email}</p>
            {currentUser.telefono && <p><strong>Teléfono:</strong> {currentUser.telefono}</p>}
          </div>
          <button type="button" className="btn-switch-account" onClick={handleLogout}>
            Cambiar de cuenta / Cerrar sesión
          </button>
        </div>
      )}

      {/* VISTA 2: FORMULARIO INICIAL DE VERIFICACIÓN DE CORREO */}
      {step === "CHECK_EMAIL" && (
        <div className="auth-step">
          <h2>Inicie sesión o cree su cuenta</h2>
          <p className="subtext">
            Utilice el correo electrónico del conductor para iniciar sesión o registrarse y acceder a las formas de pago.
          </p>

          <div className="auth-grid-split">
            <form onSubmit={handleCheckEmail} className="auth-left-form">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary-green">
                Continuar con correo electrónico
              </button>
              {errorMessage && <p className="login-error">{errorMessage}</p>}
            </form>

            <div className="auth-divider">
              <span>o</span>
            </div>

            <div className="auth-social-buttons">
              <button type="button" className="btn-social" onClick={() => alert("Próximamente Google Login")}>
                Continuar con Google
              </button>
              <button type="button" className="btn-social" onClick={() => alert("Próximamente Apple Login")}>
                Continuar con Apple
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 3A: PIDE CONTRASEÑA (USUARIO EXISTENTE) */}
      {step === "LOGIN" && (
        <div className="auth-step">
          <h2>¡Hola de nuevo!</h2>
          <p className="subtext">Ingresa tu contraseña para <strong>{email}</strong></p>
          <form onSubmit={handleLogin} className="auth-simple-form">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="button-group">
              <button type="submit" className="btn-primary-green">Iniciar Sesión</button>
              <button type="button" className="btn-link" onClick={() => setStep("CHECK_EMAIL")}>Volver</button>
            </div>
            {errorMessage && <p className="login-error">{errorMessage}</p>}
          </form>
        </div>
      )}

      {/* VISTA 3B: FORMULARIO DE REGISTRO (USUARIO NUEVO) */}
      {step === "REGISTER" && (
        <div className="auth-step">
          <h2>Crea tu cuenta para continuar</h2>
          <p className="subtext">Es tu primera vez con el correo: <strong>{email}</strong></p>
          <form onSubmit={handleRegister} className="auth-simple-form">
            <label>Nombre completo</label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <label>Teléfono</label>
            <input
              type="tel"
              placeholder="Número de celular"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <label>Crea una contraseña</label>
            <input
              type="password"
              placeholder="Contraseña segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="button-group">
              <button type="submit" className="btn-primary-green">Registrarse y Avanzar</button>
              <button type="button" className="btn-link" onClick={() => setStep("CHECK_EMAIL")}>Volver</button>
            </div>
            {errorMessage && <p className="login-error">{errorMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}