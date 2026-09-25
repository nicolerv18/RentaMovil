import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import login from "../../../assets/login.png";

function getFullName(user) {
    return [user?.firstName, user?.lastName]
        .filter(Boolean)
        .join(" ") || user?.username || "—";
}

export default function ProfileIdentity({ user }) {
    const { t } = useTranslation();

    if (!user) {
        return null;
    }

    return (
        <>
            <div className="form-image">
                <div className="form-image-preview">
                    <img
                        className="imgPerfile"
                        src={user.imageUrl || login}
                        alt={t("account.profileImage")}
                    />
                </div>
            </div>

            <div className="form-groupC">
                <label className="form-labelC" htmlFor="profile-name">
                    {t("account.nombre")}:
                </label>
                <input
                    id="profile-name"
                    className="inputC"
                    type="text"
                    value={getFullName(user)}
                    readOnly
                />
            </div>

            <div className="form-groupC">
                <label className="form-labelC" htmlFor="profile-phone">
                    {t("account.telefono")}:
                </label>
                <input
                    id="profile-phone"
                    className="inputC"
                    type="text"
                    value={user.phone || "—"}
                    readOnly
                />
            </div>

            <div className="form-groupC">
                <label className="form-labelC" htmlFor="profile-email">
                    {t("account.correo")}:
                </label>
                <input
                    id="profile-email"
                    className="inputC"
                    type="email"
                    value={user.email || "—"}
                    readOnly
                />
            </div>

            <div className="form-groupC">
                <div className="accountLink">
                    <Link to="/ChangePassword" className="linkC">
                        {t("account.modificarPassword")}
                    </Link>
                </div>
            </div>
        </>
    );
}
