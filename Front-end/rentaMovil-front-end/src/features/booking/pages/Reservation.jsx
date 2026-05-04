import './Reservation.css'

import carro from '../../../assets/carro.png';
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from '../../../shared/components/layout/Footer';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FilterCalendar from '../../vehicles/components/FilterCalendar';
import MapComponent from './components/MapComponents';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useTranslation } from "react-i18next";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function Reservation() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [opcion, setOpcion] = useState('');
    const [location, setLocation] = useState(null);
    const [nameR, setNameR] = useState("");
    const [document, setDocument] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [errorEdad, setErrorEdad] = useState("");
    const rentalDays= () => {
        if (!pickupDate || !returnDate) return 0;
        const init =  new Date (pickupDate);
        const end = new Date (returnDate);
        const diference = end- init;
         const days = Math.ceil(diference / (1000 * 60 * 60 * 24));
        return days +1 ;

    }
    const days = rentalDays();


    useEffect(() => {
        if (pickupDate && returnDate) {
            if (returnDate < pickupDate) {
                setErrorFecha(t('reservation.ErrorDate'));
            } else {
                setErrorFecha("");
            }
        }
    }, [pickupDate, returnDate]);

    const validarEdad = (fecha) => {
        if (!fecha) return false;

        const hoy = new Date();
        const nacimiento = new Date(fecha);

        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad >= 18;
    };

    useEffect(() => {
        if (birthDate) {
            if (!validarEdad(birthDate)) {
                setErrorEdad(t('reservation.ErrorAge'));
            } else {
                setErrorEdad("");
            }
        }
    }, [birthDate]);

    const Pago = () => {

        if (!pickupDate || !returnDate) {
            alert(t('reservation.selectDates'));
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

        navigate('/Payment');
    };

    return (
        <>
            <Navbar />

            <div className="containerR">

                <div className="calendar-top">
                    <FilterCalendar
                        variant="normal"
                        setPickupDate={setPickupDate}
                        setReturnDate={setReturnDate}
                    />
                </div>

                <div className="contentR">

                    <div className="leftR">
                        <div className="card-car">
                            <img className="img-car" src={carro} alt="carro" />
                            <h2>Toyota 4x4</h2>
                            <p className="price">$13,2444</p>
                        </div>

                        <div className="card-location">
                            <p><b>{t('reservation.changeLocation')}</b></p>

                            <MapComponent
                                location={location}
                                setLocation={setLocation}
                            />

                            {location && (
                                <p>
                                    Lat: {location[0].toFixed(4)} <br />
                                    Lng: {location[1].toFixed(4)}
                                </p>
                            )}
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

                                <h3>{t('reservation.summary')}</h3>
                                <p>{days} {t('reservation.days')}</p>
                                <p>{t('reservation.sure')}</p>
                                <h4>{t('reservation.total')}</h4>

                                <div>
                                    <label className='labelR'>{t('reservation.amountToPay')}</label>
                                    <select value={opcion} onChange={e => setOpcion(e.target.value)}>
                                        <option value="1">30%</option>
                                        <option value="2">50%</option>
                                        <option value="3">70%</option>
                                        <option value="4">80%</option>
                                        <option value="5">100%</option>
                                    </select>
                                </div>

                                <label className='labelR'>{t('reservation.responsible')}</label>
                                <input
                                    type="text"
                                    placeholder={t('reservation.placeholderResponsible')}
                                    value={nameR}
                                    onChange={(e) => setNameR(e.target.value)}
                                    required
                                />

                                <label className='labelR'>{t('reservation.dateOfBirth')}</label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className={errorEdad ? "inputInvalidP" : ""}
                                    required
                                />
                                {errorEdad && <p className='error2'>{errorEdad}</p>}

                                <label className='labelR'>{t('reservation.document')}</label>
                                <input
                                    type="text"
                                    placeholder='12345'
                                    value={document}
                                    onChange={(e) => setDocument(e.target.value)}
                                    required
                                />

                                <label className='labelR'>{t('reservation.phone')}</label>
                                <input type="text" placeholder='###' required />

                                <button type="submit">{t('reservation.submit')}</button>

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