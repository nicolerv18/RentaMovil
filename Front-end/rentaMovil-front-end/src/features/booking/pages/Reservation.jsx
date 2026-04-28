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

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function Reservation() {
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
                setErrorFecha("La fecha de entrega no puede ser anterior a la de recogida");
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
                setErrorEdad("Debes ser mayor de edad");
            } else {
                setErrorEdad("");
            }
        }
    }, [birthDate]);

    const Pago = () => {

        if (!pickupDate || !returnDate) {
            alert("Debes seleccionar fechas");
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
                            <p><b>Cambiar ubicación</b></p>

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

                                <h3>Resumen</h3>
                                <p>{days} días x $403.000</p>
                                <p>Seguro todo riesgo</p>
                                <h4>TOTAL: $403.000</h4>

                                <div>
                                    <label className='labelR'>Monto a pagar</label>
                                    <select value={opcion} onChange={e => setOpcion(e.target.value)}>
                                        <option value="1">30%</option>
                                        <option value="2">50%</option>
                                        <option value="3">70%</option>
                                        <option value="4">80%</option>
                                        <option value="5">100%</option>
                                    </select>
                                </div>

                                <label className='labelR'>Responsable de Reserva</label>
                                <input
                                    type="text"
                                    placeholder='Nombre y apellidos completos'
                                    value={nameR}
                                    onChange={(e) => setNameR(e.target.value)}
                                    required
                                />

                                <label className='labelR'>Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className={errorEdad ? "inputInvalidP" : ""}
                                    required
                                />
                                {errorEdad && <p className='error2'>{errorEdad}</p>}

                                <label className='labelR'>Nº Documento de identidad</label>
                                <input
                                    type="text"
                                    placeholder='12345'
                                    value={document}
                                    onChange={(e) => setDocument(e.target.value)}
                                    required
                                />

                                <label className='labelR'>Telefono</label>
                                <input type="text" placeholder='###' required />

                                <button type="submit">Alquilar</button>

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