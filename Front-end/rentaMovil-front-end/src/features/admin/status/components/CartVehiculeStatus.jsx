import style from'../components/CartVehiculeStatus.module.css'

function CartVehiculeStatus({name,text,state,plate,img,ubication}){
    return(
    <div className = {style["card-vehicule"]}>
        <img className={style["img-car-vehicule"]} src={img} alt={name} /> 
        <div className={style["text-vehicule"]}> 
        <h3 className={style["name-car-vehicule"]}>{name}</h3>
        <p>{text}</p>
        <div className={style["container-info"]}>
        <p className={style["price-vehicule"]}>Placa: {plate}</p>
        <p className={style["price-vehicule"]}>Ubicación: {ubication}</p>
        <p className={style["price-vehicule"]}>Estado: {state}</p>
        </div>
        </div>
    </div>
    )
}
export default CartVehiculeStatus;
