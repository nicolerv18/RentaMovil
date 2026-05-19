import style from "./EmailVerification.module.css";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import NavbarTwo from "../../../shared/components/layout/NavbarTwo";
import Footer from '../../../shared/components/layout/Footer';
import { useForm } from 'react-hook-form';

function EmailVerification({ email }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    function insert(data) {
        reset();
        navigate('/CodeVerification');
    }
    return (
        <>
            <NavbarTwo />

            <div className={style["container-email"]}>
                <form className={style['email-form']} onSubmit={handleSubmit(insert)}>
                    <label htmlFor="">Ingrese su correo electrónico</label>
                    <input
                    className={style["input-email"]}
                        id="email"
                        type="email"
                        defaultValue={email}
                        autoComplete='username'
                        placeholder={t('loginForm.emailPlaceholder')}
                        {...register("email", {
                            required: "El correo electrónico es necesario",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Formato de correo electrónico es inválido"

                            }
                        })} />
                    {errors.email && (
                        <p className={style['error-message']}>
                            <AiOutlineDashboard /> {errors.email.message}
                        </p>
                    )}

                    <button type="submit">Confirmar</button>
        </form >
        </div >
        <Footer />

        </>
    );

}
export default EmailVerification;