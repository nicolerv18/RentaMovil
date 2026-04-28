import '../pages/Count.css';
import { useState, useEffect } from "react";
import login from '../../../assets/login.png';
import { FaEdit, FaMoon, FaSun, FaGlobe, FaSave, FaTimes} from "react-icons/fa";
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from '../../../shared/components/layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import ButtonBack from '../../../shared/components/buttonBack';

function Count({ theme, setTheme }) {
    const navigate = useNavigate();
    const [showThemeModal, setShowThemeModal] = useState(false);
/* const handleSave = async () => {
    try {
        console.log("Datos a guardar:", user);
        /*
        await fetch("TU_API", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        
        setIsEditing(false);

    } catch (error) {
        console.error(error);
    }
};*/
    const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    };
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
    password: ""
});
useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
        setUser(JSON.parse(savedUser));
        
    } else {
        const data = {
            nombre: "Sharik Rojas",
            telefono: "3145556",
            email: "sha@example.com",
            password: "123456"
        };
        setUser(data);
    }
}, []);
    const [image, setImage] = useState(login);
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            setImage(base64);
            const updatedUser = { ...user, image: base64 };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        };

        reader.readAsDataURL(file);
    }
};

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
                    <button
                        className="icon-btn"
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                        {isEditing ? <FaSave/> : <FaEdit/>}
                    </button>

                    <button
                        className='icon-btn'
                        onClick={() => setShowThemeModal(true)}
                    >
                        <FaMoon />
                    </button>
                    <button className='icon-btn'>
                        <FaGlobe/>
                    </button>
                </div>

                {/* FORM */}
                <div className='formC'>

                    <div className='form-image'>
                        <label>
                            <img className="imgPerfile" src={image} alt="preview" />
                            <p className={`edit ${isEditing ? "editingText" : ""}`}>
                                Cambiar foto
                            </p>
                            <input
                                type="file"
                                accept='image/*'
                                onChange={handleImageChange}
                                style={{display: 'none'}}
                            />
                        </label>
                    </div>
                    <div className='form-groupC'>
                        <label className='form-labelC'>Nombre:</label>
                        <input
                            className={`inputC ${isEditing ? "editing" : ""}`}
                            type="text"
                            value={user.nombre}
                            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className='form-groupC'>
                        <label className='form-labelC'>Teléfono:</label>
                        <input
                            className={`inputC ${isEditing ? "editing" : ""}`}
                            type="text"
                            value={user.telefono}
                            onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className='form-groupC'>
                        <label className='form-labelC'>Correo Electrónico:</label>
                        <input
                            className={`inputC ${isEditing ? "editing" : ""}`}
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            disabled={!isEditing}
                        />
                    </div>

                    <div className='form-groupC'>
                        <label className='form-labelC'>Contraseña:</label>
                        <input
                            className="inputC"
                            type="password"
                            value={user.password}
                            readOnly
                        />
                    </div>

                    <Link to='/ChangePassword' className='linkC'>
                        Modificar Contraseña
                    </Link>

                    <p className="status">
                        {isEditing ? "Modo edición activado" : "Perfil actualizado"}
                    </p>

                </div>
            </div>
        </div>
        {showThemeModal && (
    <div className="modal-overlay" onClick={() => setShowThemeModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="modal-title">Selecciona un tema</p>

            <div className="theme-grid">
                {[
                    { id: "skylight",  label: "Modo azul claro",   desc: "Fondo blanco, texto oscuro" },
                    { id: "light",   label: "Modo amarrillo claro",  desc: "Fondo negro, acentos morados" },
                    { id: "dark",   label: "Azul",    desc: "Fondo azul suave, acentos navy" },
                    { id: "darkPurple", label: "Morado",  desc: "Fondo lila suave, acentos violeta" },
                ].map(({ id, label, desc }) => (
                    <button
                        key={id}
                        type="button"
                        className={`theme-card ${theme === id ? "active" : ""}`}
                        onClick={() => { setTheme(id) }}
                    >
                        <div className={`theme-preview preview-${id}`}>
                        </div>
                        <div className="theme-card-info">
                            <p className="theme-name">{label}</p>
                            <p className="theme-desc">{desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="modal-actions">
                <button className="close-btn" onClick={() => setShowThemeModal(false)}>
                    Cancelar
                </button >
                <button className="btn-times" onClick={() =>  setShowThemeModal(false)}>
                <FaTimes/>
                </button>
            </div>
        </div>
    </div>
)}
        <Footer />
    </>
);
}

export default Count;