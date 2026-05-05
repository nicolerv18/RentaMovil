import './CartVehicule.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


function CartVehicule({img,name,age,price, branch}){
    const {t} = useTranslation();
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
            <span>{t('cartVehicule.gasoline')}</span>
            <span>{t('cartVehicule.doors')}</span>
            <span>{t('cartVehicule.driving')}</span>
            <span>{t('cartVehicule.kmLimit')}</span>
        </div>

        <p className="location">
            📍 {branch}
        </p>
    </div>
    <div className="car-price">
        <p className="price">${price}</p>
        <span className="free">{t('cartVehicule.cancellation')}</span>
        <button  onClick={() => navigate("/Reservation", { state: { img, name, price, branch } })}>{t('cartVehicule.continue')}</button>
    </div>

</div>
    )
}
export default CartVehicule;
