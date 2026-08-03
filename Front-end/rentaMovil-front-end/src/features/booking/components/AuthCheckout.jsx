import React, { useState, useEffect } from "react";
import "./AuthCheckout.css"; // Para los estilos visuales que verás abajo

// MOCK LOCAL (Base de datos temporal de prueba)
const MOCK_USUARIOS_REGISTRADOS = [
  { email: "thiago@gmail.com", pass: "123456", nombre: "Thiago", telefono: "3001234567" }
];

export default function AuthCheckout({ onAuthSuccess }) {
  // Estados para controlar el flujo
  const [step, setStep] = useState("CHECK_EMAIL"); // CHECK_EMAIL | LOGIN | REGISTER | LOGGED_IN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // 1. Al cargar el componente, verificamos si ya existe una sesión en localStorage
  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      const user = JSON.parse(session);
      setCurrentUser(user);
      setStep("LOGGED_IN");
      if (onAuthSuccess) onAuthSuccess(user);
    }
  }, []);

  // 2. Comprobar si el correo existe
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    /* 
       CONEXIÓN BACKEND (FUTURA):
      const res = await fetch('/api/v1/usuarios/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      const existe = data.exists;
    */

    // SIMULACIÓN ACTUAL:
    const existe = MOCK_USUARIOS_REGISTRADOS.some((u) => u.email === email);

    if (existe) {
      setStep("LOGIN");
    } else {
      setStep("REGISTER");
    }
  };

  // 3A. Iniciar sesión (Usuario registrado)
  const handleLogin = async (e) => {
    e.preventDefault();

    /* 
       CONEXIÓN BACKEND (FUTURA):
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const user = await res.json();
    */

    // SIMULACIÓN ACTUAL:
    const user = MOCK_USUARIOS_REGISTRADOS.find(
      (u) => u.email === email && u.pass === password
    );

    if (user) {
      localStorage.setItem("user_session", JSON.stringify(user));
      setCurrentUser(user);
      setStep("LOGGED_IN");
      if (onAuthSuccess) onAuthSuccess(user);
    } else {
      alert("Contraseña incorrecta. (Prueba con: 123456)");
    }
  };

  // 3B. Registro (Usuario nuevo)
  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = { email, pass: password, nombre, telefono };

    /* 
       CONEXIÓN BACKEND (FUTURA):
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const user = await res.json();
    */

    // SIMULACIÓN ACTUAL:
    MOCK_USUARIOS_REGISTRADOS.push(newUser);
    localStorage.setItem("user_session", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setStep("LOGGED_IN");
    if (onAuthSuccess) onAuthSuccess(newUser);
  };

  // Cerrar Sesión / Cambiar de cuenta
  const handleLogout = () => {
    localStorage.removeItem("user_session");
    setCurrentUser(null);
    setEmail("");
    setPassword("");
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
          </form>
        </div>
      )}
    </div>
  );
}