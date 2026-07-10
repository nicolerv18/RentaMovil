    import "./Reservation.css";
    import { useNavigate, useLocation } from "react-router-dom";
    import { useTranslation } from "react-i18next";
    import L from "leaflet";
    import markerIcon from "leaflet/dist/images/marker-icon.png";
    import markerShadow from "leaflet/dist/images/marker-shadow.png";
    import Navbar from "../../../shared/components/layout/Navbar";
    import Footer from "../../../shared/components/layout/Footer";
    import { branches } from "../../../shared/mocks/branches";
    import { useIsMobile } from "../../../shared/hooks/useIsMobile";
    import FilterCalendar from "../../vehicles/components/FilterCalendar";
    import MapComponent from "../components/MapComponents";
    import { useReservationForm } from "../hooks/useReservationForm";

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
    const isMobile = useIsMobile(768);

    const {
        opcion,
        setOpcion,
        selectedBranch,
        setSelectedBranch,
        nameR,
        setNameR,
        document,
        setDocument,
        birthDate,
        setBirthDate,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        errorFecha,
        errorEdad,
        days,
        total,
        showFilters,
        toggleShowFilters,
        handlePayment,
    } = useReservationForm(price, navigate, t, branch);

    if (!name) {
        return <p>No hay vehículo seleccionado</p>;
    }

    return (
        <>
        <Navbar />

        <div className="containerR">
            <div className="calendar-top">
            {isMobile && (
                <button
                type="button"
                className="filter-toggle"
                onClick={() => toggleShowFilters()}
                >
                {showFilters ? "Ocultar filtros ▲" : "Mostrar filtros ▼"}
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
                <img className="img-car" src={img} alt={name} />

                <h2>{name}</h2>

                <p className="price">${price}</p>
                </div>

                <div className="card-location">
                <p>
                    Lugar de recogida:
                    <strong> {branch.name}</strong>
                </p>

                <p>Seleccione el lugar de entrega:</p>

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
                    handlePayment();
                    }}
                >
                    <h3>{t("reservation.summary")}</h3>

                    <p>
                    {days} {t("reservation.days")} × ${price}
                    </p>

                    <p>{t("reservation.sure")}</p>

                    <h4>
                    {t("reservation.total")} ${total}
                    </h4>

                    <div>
                    <label className="labelR">{t("reservation.amountToPay")}</label>

                    <select value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                        <option value="1">30%</option>
                        <option value="2">50%</option>
                        <option value="3">70%</option>
                        <option value="4">80%</option>
                        <option value="5">100%</option>
                    </select>
                    </div>

                    <label className="labelR">{t("reservation.responsible")}</label>

                    <input
                    type="text"
                    placeholder={t("reservation.placeholderResponsible")}
                    value={nameR}
                    onChange={(e) => setNameR(e.target.value)}
                    required
                    />

                    <label className="labelR">{t("reservation.dateOfBirth")}</label>

                    <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={errorEdad ? "inputInvalidP" : ""}
                    required
                    />

                    {errorEdad && <p className="error2">{errorEdad}</p>}

                    <label className="labelR">{t("reservation.document")}</label>

                    <input
                    type="text"
                    placeholder="12345"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    required
                    />

                    <label className="labelR">{t("reservation.phone")}</label>

                    <input type="text" placeholder="###" required />

                    <button type="submit">{t("reservation.submit")}</button>
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