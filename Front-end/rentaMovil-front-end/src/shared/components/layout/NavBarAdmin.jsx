import "./NavBarAdmin.css";
import { Link } from "react-router-dom";
import {FaCar} from "react-icons/fa";
import {MdPerson} from "react-icons/md";
import {FaBars} from "react-icons/fa";
import { useState } from 'react';
import AdminPanel from '../../../features/admin/HomeAdmin/Components/AdminPanel.jsx';

function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    return (
        <>
            <header className='navbar'>

                <div className='logo-container'>
                    <h2 className='Title'>RentaMovil</h2>
                    <FaCar className='icon'/>
                </div>

                <div className='menu-toggle'>
                    <FaBars className="icon-FaBars" onClick={() => setMenuOpen(!menuOpen)} />
                </div>

                <nav className={`nav-links-container ${menuOpen ? "active" : ""}`}>
                    <Link to="/HomeAdmin">Inicio</Link>
                    <Link to="/Notification">Notificaciones</Link>
                    <Link to="/Reservation">Reservación</Link>
                    <span
                        className={`nav-admin-link ${adminOpen ? "nav-admin-active" : ""}`}
                        onClick={() => setAdminOpen(!adminOpen)}
                    >
                        Administración
                    </span>
                    <Link to="/Count"><MdPerson className='icon-user'/></Link>
                </nav>

            </header>

            <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
        </>
    );
}

export default Navbar;