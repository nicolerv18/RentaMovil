import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./LoginForm.css";
import Quotes from '../../../shared/components/Quotes';

function LoginForm({onSubmit}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password){
            return setError('Rellena todos los campos')
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError('Introduce un email válido')
        }
        setLoading(true);
        try {
            await onSubmit({email, password});
        } catch (err) {
            setError(err.message || 'Error de autenticacion');
        } finally {
            setLoading(false);
        }
    };
    return(
        <section className="login">
        <form className='login-form' onSubmit={handleSubmit} aria-live='polite'>
            <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input 
                    id="email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete='username' 
                    placeholder="tu@email.com"
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete='current-password'
                    placeholder="••••••••"
                    required
                />
            </div>
            {error && <div className='login-error' role='alert'>{error}</div>} 
            <Link to="/home" className='register-link'>¿No tienes cuenta? Regístrate</Link>
            <button className='email-btn' type="submit" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            </form>
            <Quotes />
        </section>

    )

}

export default LoginForm;