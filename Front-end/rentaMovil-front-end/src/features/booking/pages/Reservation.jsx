import './Reservation.css'

import carro from '../../../assets/carro.png';
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from '../../../shared/components/layout/Footer';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Reservation() {
const navigate = useNavigate();
const today = new Date().toISOString().split('T')[0];
const [pickupDate, setPickupDate] = useState("");
const [returnDate, setReturnDate] = useState("");
const [error, setError] = useState("");
    useEffect(() => {
        if (pickupDate && returnDate) {
            if (returnDate < pickupDate) {
                setError("La fecha de entrega no puede ser anterior a la de recogida");
            } else {
                setError("");
            }
        }
    }, [pickupDate, returnDate]);

const Pago = () => {
navigate('/Payment');
};
return(
    <>
    <Navbar />
    <div className='containerR'>
    <div className='cardR'>
    <div className='card-headerR'>
    <img className="img-car" src={carro} alt="carro" />
    <h2 className='card-h2'>Toyota 4x4</h2>
    <p className='price'>$13,2444</p>
    </div>
    <div className='form-grid'>
    <div>
    <label className='form-label' htmlFor="nombre">Elegir fecha de inicio:</label>
    <input  className="date" type="date" placeholder='Nombre' value={pickupDate} min={today} onChange={(e) => setPickupDate(e.target.value)}/>
    </div>
    <div>
    <label className='form-label' htmlFor="nombre"> Elegir Lugar de retiro: </label>
    <input type="text" placeholder='Nombre' />
    </div>
    <div>
    <label className='form-label' htmlFor="nombre">Hora de retiro:</label>
    <input className='time' type="time" placeholder='Nombre' />
    </div>
        <div>
    <label className='form-label' htmlFor="nombre">Elegir fecha de fin:</label>
    <input  className="date" type="date" placeholder='Nombre' value={returnDate} min={pickupDate} onChange={(e) => setReturnDate(e.target.value)}/>
    </div>
        <div>
    <label className='form-label' htmlFor="nombre">Elegir lugar de entrega:</label>
    <input type="text" placeholder='Nombre' />
    </div>
        <div>
    <label className='form-label' htmlFor="nombre">Hora de entrega:</label>
    <input  className="time" type="time" placeholder='Nombre' />
    </div>
    <button onClick={Pago}  disabled={!!error || !pickupDate || !returnDate}>Alquilar</button>
    </div>
    </div>
    </div>
    <Footer />
    </>
    
);
}

export default Reservation;