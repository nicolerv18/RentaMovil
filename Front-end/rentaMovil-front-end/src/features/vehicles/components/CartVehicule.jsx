import Reservation from '../../booking/pages/Reservation';
import '../components/CartVehicule.css'
import { useNavigate } from 'react-router-dom';

function CartVehicule({img,name,age,price}){
    const navigate = useNavigate();
    return(
<div className="card-vehicule">
    <div className="car-img">
        <img src={img} alt={name} />
    </div>
    {/* CENTRO - INFO */}
    <div className="car-info">
        <h3>{name}</h3>
        <p className="car-type">Mini similar</p>

        <div className="features">
            <span>Gasolina</span>
            <span>5 puertas</span>
            <span>⚙️ Manual</span>
            <span>∞ Km libre</span>
        </div>

        <p className="location">
            📍 Aeropuerto, Bogotá
        </p>
    </div>
    <div className="car-price">
        <p className="price">${price}</p>
        <span className="free">Cancelación gratis</span>
        <button onClick={() => navigate("/Reservation")}>Continuar</button>
    </div>

</div>
    )
}
export default CartVehicule;
