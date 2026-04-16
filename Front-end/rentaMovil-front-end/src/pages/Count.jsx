import './Count.css'
import login from '../assets/login.png'
import {FaLanguage, FaEdit, FaGlobe, FaMoon, FaSun} from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Link, useNavigate} from 'react-router-dom';
import ButtonBack from "../components/ButtonBack";


function Count( {darkMode, setDarkMode} ) {
    const navigate = useNavigate();
return(
    <>
    <Navbar />
    <div className='containerC'>
    <div className='cardC'>
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
    <div className='formC'>
    <div>
    <img className="img" src={login}  alt='login'/>
    </div>
    <div>
    <label className='form-labelC' htmlFor="nombre">Nombre:</label>
    <input  type="text" placeholder='Nombre'/>
    </div>
    <div>
    <label className='form-labelC' htmlFor="nombre">Telefono: </label>
    <input type="text" placeholder='Nombre' />
    </div>
    <div>
    <label className='form-labelC' htmlFor="nombre">Correo Electronico:</label>
    <input className='email' type="email" placeholder='Correo Electronico' />
    </div>
    <div>
    <label className='form-labelC' htmlFor="nombre">Contraseña:</label>
    <input className='email' type="password" placeholder='Contraseña' />
    </div>
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