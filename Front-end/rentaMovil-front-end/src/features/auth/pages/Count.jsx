import './count.css'
import login from '../../../assets/img/Login1.png'
import {FaEdit, FaMoon} from "react-icons/fa";
import Navbar from '../../../shared/components/layout/Navbar.jsx';
import Footer from '../../../shared/components/layout/Footer.jsx';

function Count() {
return(
    <>
    <Navbar />
    <div className='containerC'>
    <div className='cardC'>
    <div className="actions">
    <button className="icon-btn"><FaEdit /></button>
    <button className="icon-btn"><FaMoon /></button>
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
    <button className='buttonC'>Modificar Contraseña</button>
    </div>
    </div>
    </div>
    <Footer />
    </>
    
);
}

export default Count;