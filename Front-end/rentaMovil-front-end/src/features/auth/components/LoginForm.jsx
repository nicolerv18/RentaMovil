import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Quotes from '../../../shared/components/Quotes.jsx';
import './LoginForm.css';
import { useTranslation } from 'react-i18next';
 


function LoginForm({onSubmit}){
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password){
            return setError('loginForm.errorFields')
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError('loginForm.emailInvalid')
        }
        setLoading(true);
        try {
            await onSubmit({email, password});
        } catch (err) {
            setError('loginForm.errorAuthentication');
        } finally {
            setLoading(false);
        }
    };
    return(
        <section className="login">
        <form className='login-form' onSubmit={handleSubmit} aria-live='polite'>
            <div className="form-group">
                <label htmlFor="email">{t('loginForm.email')}</label>
                <input 
                    id="email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete='username' 
                    placeholder={t('loginForm.emailPlaceholder')}
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">{t('loginForm.password')}</label>
                <input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    autoComplete='current-password'
                    placeholder={t('loginForm.passwordPlaceholder')}
                    required
                />
            </div>
            {error && <div className='login-error' role='alert'>{t(error)}</div>} 
            <Link to="/home" className='register-link'>{t('loginForm.noAccount')}</Link>
            <button className='email-btn' type="submit" disabled={loading}>
                {loading ? t('loginForm.submitting') : t('loginForm.submit')}
            </button>
            </form>
            <Quotes />
        </section>

    )

}

export default LoginForm;