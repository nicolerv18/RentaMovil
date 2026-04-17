import style from '../components/MaintenanceForm.module.css';
import ButtonBack from '../../../../shared/components/ButtonBack';
function MaintenanceForm() {
    return (
        <>
        <div className={style['maintenance-container']}>
            <h2>Registre un nuevo mantenimiento</h2>
            <form className={style['maintenance-form']}>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="plate">Placa:</label>
                <input type="text" placeholder="Placa"/> 
            </div>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="model">Modelo:</label>
                <input type="text" placeholder="Marca"/> 
            </div>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="date">Fecha:</label>
                <input type="date" placeholder="Fecha"/> 
            </div>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="plate">Marca:</label>
                <input type="text" placeholder="Marca"/> 
            </div>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="type">Tipo de vehículo:</label>
                <input type="text" placeholder="Tipo de vehículo"/> 
            </div>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="maintenance-type">Tipo de mantenimiento:</label>
                <input type="text" placeholder="Tipo de mantenimiento"/> 
            </div>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="maintenance-notes">Observaciones</label>
                <input type="text" placeholder="Observaciones"/> 
            </div> 
            
            </form>
            <button className="save" type="submit">Agendar</button>
            <button className='history' type='submit'>Historial de contratos</button>
        </div>
        </>

    )
    
}
export default MaintenanceForm;