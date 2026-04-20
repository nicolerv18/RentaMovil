import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Quotes from '../../../shared/components/Quotes.jsx';
import './LoginForm.css';

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
        <section className="login-container">
        <form className='login-form' onSubmit={handleSubmit} aria-live='polite'>
           <div className='login-form-input'>
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='username' required /> 
            </div>
           <div className='login-form-input'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' required/>
            
            <Link to="/home" className='password-link'>¿Olvidaste tu contraseña?</Link>
            <Link to="/home" className='register-link'>¿No tienes cuenta? Regístrate</Link>
            </div>        
            {error && <div className='login-error' role='alert'>{error}</div>}
            

            <button className='email-btn' type="submit" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
        </form>
            <Quotes />
        </section>

    )

}
   
    
export default LoginForm;