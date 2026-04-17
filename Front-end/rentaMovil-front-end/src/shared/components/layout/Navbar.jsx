import './Navbar.css'
import { Link } from "react-router-dom";
import {FaCar} from "react-icons/fa";
import {MdPerson} from "react-icons/md";

function Navbar(){
    return (
        <header className='navbar'>

            <div className='logo-container'>
                <h2 className='Title'>RentaMovil</h2>
                <FaCar className='icon'/>
            </div>

            <nav className='nav-links-container'>
                <Link to="/Home">Inicio</Link>
                <Link to="/Notification">Notificaciones</Link>
                <Link to="/Reservation">Reservación</Link>
                <Link to="/Count"><MdPerson className='icon-user'/></Link>
            </nav>

        </header>
    );
}

export default Navbar;