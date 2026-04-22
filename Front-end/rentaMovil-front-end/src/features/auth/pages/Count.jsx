import './Count.css';
import login from '../../../assets/login.png';
import { FaEdit, FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from '../../../shared/components/layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import ButtonBack from '../../../shared/components/buttonBack';

function Count({ darkMode, setDarkMode }) {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className='containerC'>
                <div className='cardC'>

                    {/* HEADER */}
                        <div className="header-page">
                            <ButtonBack onClick={() => navigate(-1)} />
                        </div>
                        <div className="actions">
                        <button className="icon-btn"><FaEdit /></button>
                    <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <button className='icon-btn'> <FaGlobe/></button>
                    </div>

                    {/* FORM */}
                    <div className='formC'>

                        {/* IMAGEN */}
                        <div className='form-image'>
                            <img className="img" src={login} alt='login' />
                        </div>

                        {/* NOMBRE */}
                        <div className='form-groupC'>
                            <label className='form-labelC'>Nombre:</label>
                            <input type="text" placeholder='Juanito Pérez' />
                        </div>

                        {/* TELÉFONO */}
                        <div className='form-groupC'>
                            <label className='form-labelC'>Teléfono:</label>
                            <input type="text" placeholder='3145556' />
                        </div>

                        {/* EMAIL */}
                        <div className='form-groupC'>
                            <label className='form-labelC'>Correo Electrónico:</label>
                            <input type="email" placeholder='juanito@example.com' />
                        </div>

                        {/* PASSWORD */}
                        <div className='form-groupC'>
                            <label className='form-labelC'>Contraseña:</label>
                            <input type="password" placeholder='********' />
                        </div>

                        {/* LINK */}
                        <Link to='/ChangePassword' className='linkC'>
                            Modificar Contraseña
                        </Link>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Count;