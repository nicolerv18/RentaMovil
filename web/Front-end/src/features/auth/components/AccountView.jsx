import { useState } from "react";
import { FaGlobe, FaMoon, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "../../../shared/components/layout/Navbar";
import NavbarAdmin from "../../../shared/components/layout/NavBarAdmin";
import Footer from "../../../shared/components/layout/Footer";
import FooterAdmin from "../../../shared/components/layout/FooterAdmin";
import ButtonBack from "../../../shared/components/buttonBack";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileIdentity from "./ProfileIdentity";

import espanish from "../../../assets/img/espana.png";
import english from "../../../assets/img/eeuu.png";
import french from "../../../assets/img/francia2.png";
import portuguese from "../../../assets/img/portugal.png";

export default function AccountView({ theme, setTheme, admin = false }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user, isLoading, error, refreshProfile, logout } = useAuth();
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [showLangModal, setShowLangModal] = useState(false);

    const NavbarComponent = admin ? NavbarAdmin : Navbar;
    const FooterComponent = admin ? FooterAdmin : Footer;

    const handleLangChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
        setShowLangModal(false);
    };

    const handleRetry = async () => {
        try {
            await refreshProfile();
        } catch {
            // El error queda expuesto en el estado de AuthContext.
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    if (isLoading) {
        return <p className="route-loading">Cargando perfil...</p>;
    }

    if (!user) {
        return (
            <>
                <NavbarComponent />
                <div className="containerC">
                    <div className="cardC">
                        <p className="account-error" role="alert">
                            {error || "No hay una sesión disponible."}
                        </p>
                        <div className="actions account-actions-fallback">
                            <button
                                className="close-btn"
                                type="button"
                                onClick={handleRetry}
                            >
                                {t("account.retry")}
                            </button>
                            <Link className="linkC" to="/">
                                {t("account.signIn")}
                            </Link>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </>
        );
    }

    return (
        <>
            <NavbarComponent />
            <div className="containerC">
                <div className="cardC">
                    <div className="header-page">
                        <ButtonBack
                            onClick={() => navigate(-1)}
                            variant="overlay"
                        />
                        <p className="status2">
                            {t("account.profileStatus")}
                        </p>
                    </div>

                    {error && (
                        <p className="account-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="actions">
                        <button
                            className="icon-btnC"
                            type="button"
                            onClick={() => setShowThemeModal(true)}
                        >
                            <FaMoon />
                        </button>
                        <button
                            className="icon-btnC"
                            type="button"
                            onClick={() => setShowLangModal(true)}
                        >
                            <FaGlobe />
                        </button>
                        <button
                            className="icon-btnC"
                            type="button"
                            onClick={handleLogout}
                            aria-label={t("account.logout")}
                            title={t("account.logout")}
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>

                    <div className="formC">
                        <ProfileIdentity user={user} />
                    </div>
                </div>
            </div>

            {showThemeModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowThemeModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <p className="modal-title">
                            {t("account.seleccionaTema")}
                        </p>
                        <div className="theme-grid">
                            {[
                                {
                                    id: "skylight",
                                    label: "Modo azul claro",
                                    desc: "Fondo blanco, texto oscuro",
                                },
                                {
                                    id: "light",
                                    label: "Modo Verde claro",
                                    desc: "Fondo blanco, acentos amarillos",
                                },
                                {
                                    id: "dark",
                                    label: "Azul Oscuro",
                                    desc: "Fondo azul noche, acentos navy",
                                },
                                {
                                    id: "darkPurple",
                                    label: "Verde Oscuro",
                                    desc: "Fondo verde oscuro, acentos claros",
                                },
                            ].map(({ id, label, desc }) => (
                                <button
                                    key={id}
                                    type="button"
                                    className={`theme-card ${
                                        theme === id ? "active2" : ""
                                    }`}
                                    onClick={() => setTheme(id)}
                                >
                                    <div
                                        className={`theme-preview preview-${id}`}
                                    ></div>
                                    <div className="theme-card-info">
                                        <p className="theme-name">{label}</p>
                                        <p className="theme-desc">{desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="modal-actions">
                            <button
                                className="close-btn"
                                type="button"
                                onClick={() => setShowThemeModal(false)}
                            >
                                {t("account.cancelar")}
                            </button>
                            <button
                                className="btn-times"
                                type="button"
                                onClick={() => setShowThemeModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLangModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowLangModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <p className="modal-title">
                            {t("account.seleccionaIdioma")}
                        </p>
                        <div className="theme-grid">
                            {[
                                {
                                    id: "es",
                                    label: "Español",
                                    flag: espanish,
                                    desc: "Spanish",
                                },
                                {
                                    id: "en",
                                    label: "English",
                                    flag: english,
                                    desc: "Inglés",
                                },
                                {
                                    id: "fr",
                                    label: "Français",
                                    flag: french,
                                    desc: "Francés",
                                },
                                {
                                    id: "pt",
                                    label: "Português",
                                    flag: portuguese,
                                    desc: "Portugués",
                                },
                            ].map(({ id, label, flag, desc }) => (
                                <button
                                    key={id}
                                    type="button"
                                    className={`theme-card ${
                                        i18n.language === id ? "active" : ""
                                    }`}
                                    onClick={() => handleLangChange(id)}
                                >
                                    <div className="lang-preview">
                                        <img
                                            className="lang-flag"
                                            src={flag}
                                            alt={label}
                                        />
                                    </div>
                                    <div className="theme-card-info">
                                        <p className="theme-name">{label}</p>
                                        <p className="theme-desc">{desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="modal-actions">
                            <button
                                className="close-btn"
                                type="button"
                                onClick={() => setShowLangModal(false)}
                            >
                                {t("account.cancelar")}
                            </button>
                            <button
                                className="btn-times"
                                type="button"
                                onClick={() => setShowLangModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <FooterComponent />
        </>
    );
}
