import Navbar from "../../../../shared/components/layout/Navbar";
import Footer from '../../../../shared/components/layout/Footer';
import style from'./VehicleForm.module.css';

function VehicleForm() {
    return (
       <>
            <div className={style['vehicle-form']}>
                <form className={style['form-container']}>
                    <h2>Registre un nuevo vehículo</h2>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" placeholder="Nombre"/> 
                    </div>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="plate">Placa:</label>
                        <input type="text" placeholder="Placa"/> 
                    </div>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="brand">Marca:</label>
                        <input type="text" placeholder="Marca"/> 
                    </div>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="model">Modelo:</label>
                        <input type="text" placeholder="Modelo"/> 
                    </div>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="vehicleType">Tipo de vehículo:</label>
                        <input type="text" placeholder="Tipo de vehículo"/> 
                    </div>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="fuelType">Tipo de combustible:</label>
                        <input type="text" placeholder="Tipo de combustible"/>
                    </div>
                    <div className={style['vehicle-form-input']}>
                        <label htmlFor="location">Ubicación:</label>
                        <input type="text" placeholder="Ubicación"/>  
                    </div>

                    <button className="save" type="submit">Guardar el vehículo</button>
                </form>
            </div>
        </>
    );
}
export default VehicleForm;