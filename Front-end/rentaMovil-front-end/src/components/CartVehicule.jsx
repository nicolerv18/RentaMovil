import '../components/CartVehicule.css'

function CartVehicule({img,name,age,price}){
    return(
    <div className="card-vehicule">
        <img className="img-car-vehicule" src={img} alt={name} /> 
        <div className="text-vehicule"> 
        <h3 className="name-car-vehicule">{name}</h3>
        <p>{age}</p>
        <p className='price-vehicule'>${price}día</p>
        <button className="btn-vhehicule" onClick={() => navigate("/pago")}>Alquilar</button>
        </div>
    </div>
    )
}
export default CartVehicule;
