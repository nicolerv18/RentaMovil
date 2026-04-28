import './Navbar.css'
import { Link } from "react-router-dom";
import {FaCar} from "react-icons/fa";
import {MdPerson} from "react-icons/md";
import {FaBars} from "react-icons/fa";
import { useState } from 'react';

function Navbar(){
    const [open, setOpen] = useState(false);

    return (
        <header className='navbar'>

            <div className='logo-container'>
                <h2 className='Title'>RentaMovil</h2>
                <FaCar className='icon'/>
            </div>
            <div className='menu-toggle'>
                <FaBars  className="icon-FaBars" onClick={() => setOpen(!open)} />
            </div>

                <nav className={`nav-links-container ${open ? "active" : ""}`}>
                <Link to="/Home">Inicio</Link>
                <Link to="/Notification">Notificaciones</Link>
                <Link to="/Count"><MdPerson className='icon-user'/></Link>
            </nav>

        </header>
    );
}

export default Navbar;