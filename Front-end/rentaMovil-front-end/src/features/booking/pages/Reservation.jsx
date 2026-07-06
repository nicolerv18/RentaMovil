    import "./Reservation.css";
    import Navbar from "../../../shared/components/layout/Navbar";
    import { branches } from "../../vehicles/data/mocks/branches";
    import Footer from "../../../shared/components/layout/Footer";
    import { useState, useEffect } from "react";
    import { useNavigate, useLocation } from "react-router-dom";
    import FilterCalendar from "../../vehicles/components/FilterCalendar";
    import MapComponent from "../components/MapComponents";
    import L from "leaflet";
    import markerIcon from "leaflet/dist/images/marker-icon.png";
    import markerShadow from "leaflet/dist/images/marker-shadow.png";
    import { useTranslation } from "react-i18next";

    const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    function Reservation() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const { img, name, price, branch } = location.state || {};

    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768);

    useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
        window.removeEventListener(
        "resize",
        handleResize
        );
    }, []);
    const [opcion, setOpcion] = useState("");
    const [mapLocation, setMapLocation] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [nameR, setNameR] = useState("");
    const [document, setDocument] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [errorEdad, setErrorEdad] = useState("");

    if (!name) {
        return <p>No hay vehículo seleccionado</p>;
    }


    const rentalDays = () => {
        if (!pickupDate || !returnDate) return 0;

        const init = new Date(pickupDate);
        const end = new Date(returnDate);

        const difference = end - init;
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        return days + 1;
    };

    const days = rentalDays();

    useEffect(() => {
        if (pickupDate && returnDate) {
        if (returnDate < pickupDate) {
            setErrorFecha(t("reservation.ErrorDate"));
        } else {
            setErrorFecha("");
        }
        }
    }, [pickupDate, returnDate, t]);

    const validarEdad = (fecha) => {
        if (!fecha) return false;

        const hoy = new Date();
        const nacimiento = new Date(fecha);

        let edad = hoy.getFullYear() - nacimiento.getFullYear();

        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < nacimiento.getDate())
        ) {
        edad--;
        }

        return edad >= 18;
    };

    useEffect(() => {
        if (birthDate) {
        if (!validarEdad(birthDate)) {
            setErrorEdad(t("reservation.ErrorAge"));
        } else {
            setErrorEdad("");
        }
        }
    }, [birthDate, t]);

    const Pago = () => {
        if (!pickupDate || !returnDate) {
        alert(t("reservation.selectDates"));
        return;
        }

        if (errorFecha) {
        alert(errorFecha);
        return;
        }

        if (errorEdad) {
        alert(errorEdad);
        return;
        }

        navigate("/Payment");
    };

    const total = days * price;

    return (
        <>
        <Navbar />

        <div className="containerR">
            <div className="calendar-top">
            {isMobile && (
                <button
                type="button"
                className="filter-toggle"
                onClick={() =>
                    setShowFilters(!showFilters)
                }
                >
                {showFilters
                    ? "Ocultar filtros ▲"
                    : "Mostrar filtros ▼"}
                </button>
            )}

            {(!isMobile || showFilters) && (
                <FilterCalendar
                variant="normal"
                setPickupDate={setPickupDate}
                setReturnDate={setReturnDate}
                />
            )}

            </div>

            <div className="contentR">
            <div className="leftR">
                <div className="card-car">
                <img
                    className="img-car"
                    src={img}
                    alt={name}
                />
                <h2>{name}</h2>
                <p className="price">${price}</p>
                </div>

                <div className="card-location">
                <p> Lugar de recogida: {branch.name}</p>
                <p>Sleccione el lugar de entrega: </p>
                {selectedBranch && (
                    <div>
                        <strong>Sucursal de entrega:</strong> {selectedBranch.name}
                    </div>
                )}

                <MapComponent
                    mode="select"
                    branches={branches}
                    selectedBranch={selectedBranch}
                    setSelectedBranch={setSelectedBranch}
                />
                </div>
            </div>

            <div className="rightR">
                <div className="card-summary">
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    Pago();
                    }}
                >
                    <h3>{t("reservation.summary")}</h3>

                    <p>
                    {days} {t("reservation.days")} {price}
                    </p>

                    <p>{t("reservation.sure")}</p>

                    <h4>
                    {t("reservation.total")}
                    {total}
                    </h4>

                    <div>
                    <label className="labelR">
                        {t("reservation.amountToPay")}
                    </label>

                    <select
                        value={opcion}
                        onChange={(e) =>
                        setOpcion(e.target.value)
                        }
                    >
                        <option value="1">30%</option>
                        <option value="2">50%</option>
                        <option value="3">70%</option>
                        <option value="4">80%</option>
                        <option value="5">100%</option>
                    </select>
                    </div>

                    <label className="labelR">
                    {t("reservation.responsible")}
                    </label>

                    <input
                    type="text"
                    placeholder={t(
                        "reservation.placeholderResponsible"
                    )}
                    value={nameR}
                    onChange={(e) =>
                        setNameR(e.target.value)
                    }
                    required
                    />

                    <label className="labelR">
                    {t("reservation.dateOfBirth")}
                    </label>

                    <input
                    type="date"
                    value={birthDate}
                    onChange={(e) =>
                        setBirthDate(e.target.value)
                    }
                    className={
                        errorEdad ? "inputInvalidP" : ""
                    }
                    required
                    />

                    {errorEdad && (
                    <p className="error2">
                        {errorEdad}
                    </p>
                    )}

                    <label className="labelR">
                    {t("reservation.document")}
                    </label>

                    <input
                    type="text"
                    placeholder="12345"
                    value={document}
                    onChange={(e) =>
                        setDocument(e.target.value)
                    }
                    required
                    />

                    <label className="labelR">
                    {t("reservation.phone")}
                    </label>

                    <input
                    type="text"
                    placeholder="###"
                    required
                    />

                    <button type="submit">
                    {t("reservation.submit")}
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>

        <Footer />
        </>
    );
    }

    export default Reservation;