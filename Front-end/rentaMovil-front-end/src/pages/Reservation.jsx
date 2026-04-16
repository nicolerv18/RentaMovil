import './Reservation.css'
import carro from '../assets/carro.png'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";


function Reservation() {
  const navigate = useNavigate();

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
    <div className='form-group'>
    <label className='form-label' htmlFor="nombre">Elegir fecha de inicio:</label>
    <input  className="date" type="date" placeholder='Nombre' />
    </div>
    <div className='form-group'>
    <label className='form-label' htmlFor="nombre"> Elegir Lugar de retiro: </label>
    <input type="text" placeholder='Nombre' />
    </div>
    <div className='form-group'>
    <label className='form-label' htmlFor="nombre">Hora de retiro:</label>
    <input className='time' type="time" placeholder='Nombre' />
    </div>
        <div className='form-group'>
    <label className='form-label' htmlFor="nombre">Elegir fecha de fin:</label>
    <input  className="date" type="date" placeholder='Nombre' />
    </div>
        <div className='form-group'>
    <label className='form-label' htmlFor="nombre">Elegir lugar de entrega:</label>
    <input type="text" placeholder='Nombre' />
    </div>
        <div className='form-group'>
    <label className='form-label' htmlFor="nombre">Hora de entrega:</label>
    <input  className="time" type="time" placeholder='Nombre' />
    </div>
    <Link to="/Payment"><button className='buttonR'>Alquilar</button></Link>
    </div>
    </div>
    </div>
    <Footer />
    </>
    
);
}

export default Reservation;