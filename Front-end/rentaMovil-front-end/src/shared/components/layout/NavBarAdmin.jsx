import "./NavBarAdmin.css";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import AdminPanel from "../../../features/admin/HomeAdmin/Components/AdminPanel.jsx";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Controla el menú de hamburguesa flotante de navegación
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) setAdminOpen(false); // Si se abre este, cierra el Admin Panel
  };

  // Controla la apertura del Panel de Administración
  const handleToggleAdmin = () => {
    setAdminOpen(!adminOpen);
    if (!adminOpen) setMenuOpen(false); // Si se abre este, cierra el menú de navegación
  };

  return (
    <>
      <header className="navbar">
        <Link to="/HomeAdmin" className="logo-container">
          <span className="logo-text">RentaMovil</span>
          <FaCar className="logo-icon" />
        </Link>

        <div className="menu-toggle">
          <FaBars className="icon-FaBars" onClick={handleToggleMenu} />
        </div>

        <nav className={`nav-links-container ${menuOpen ? "active" : ""}`}>
          <Link to="/HomeAdmin">{t("navbar.linkInit")}</Link>
          <Link to="/NotificationAdmin">{t("navbar.linkNotifications")}</Link>

          <span
            className={`nav-admin-link ${adminOpen ? "nav-admin-active" : ""}`}
            onClick={handleToggleAdmin}
          >
            {t("navbar.linkPanelAdmin")}
          </span>
          <Link to="/CountAdmin">
            <MdPerson className="icon-user" />
          </Link>
        </nav>
      </header>

      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}

export default Navbar;
