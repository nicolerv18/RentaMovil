import style from '../components/MaintenanceForm.module.css';
import ButtonBack from '../../../../shared/components/ButtonBack';
import { AiOutlineDashboard } from "react-icons/ai";

import ValidateDate  from './ValidateDate';
//se instala librerio de home koo form para manejejar formulario validaciones
// se instala en la terminal con : npm install react-hook-form

import { useForm } from 'react-hook-form';
 
function MaintenanceForm() {
    /* // se inicializa el hook useForm para manejar el estado del formulario
    // el register se encargara de registrar cada campo de los inputs para su validacion
    // formState se encarga de manejar el estado del formulario, como errores, si esta sucio, etc
    // hadleSubmit se encarga de manejar el submit del formulario, validando los campos antes de enviar los datos */
    const {register, formState : {errors}, handleSubmit,reset } = useForm();

    /* por medio de esta fucion se maneja el envio de los datos del formulario */
    function insert(data)  {
        reset(); // se resetea el formulario despues de enviar los datos
    }

    
    return (
        <>
        <div className={style['maintenance-container']}>
            <h2>Registre un nuevo mantenimiento</h2>
            
            <form className={style['maintenance-form']} onSubmit={handleSubmit(insert)}>
            <div className={style["maintenance-form-left"]}> 
            <div className={style['maintenance-form-input']}>
                <label htmlFor="plate">Placa:</label>
                <input type="text" placeholder="Placa" {...register("plate", {required: true, pattern: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/})}/> 
                {errors.plate?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.plate?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de placa inválido!</p>}
            </div>
          
            <div className={style['maintenance-form-input']}>
                <label htmlFor="model">Modelo:</label>
                <input type="text" placeholder="Modelo" {...register("model", {required: true, pattern: /^[A-Za-z0-9\s]{2,30}$/})}/> 
                {errors.model?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.model?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de modelo inválido!</p>}
            </div>
            
            <div className={style['maintenance-form-input']}>
                <label htmlFor="date">Fecha:</label>
                <input type="date" placeholder="Fecha" {...register("date", {required: true, validate: ValidateDate})}/> 
                {errors.date?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.date?.message && <p className={style['error-message']}><AiOutlineDashboard />{errors.date.message}</p>}

            </div>
            </div>
            <div className={style["maintenance-form-right"]}> 
            <div className={style['maintenance-form-input']}>
                <label htmlFor="plate">Marca:</label>
                <input type="text" placeholder="Marca" {...register("brand", {required: true, minLength: 2, maxLength: 30, pattern: /^[A-Za-z\s]{2,30}$/})}/> 
                {errors.brand?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.brand?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> La marca debe tener al menos 2 caracteres!</p>}
                {errors.brand?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> La marca no debe tener mas de 30 caracteres!</p>}
                {errors.brand?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de marca inválido!</p>}
            </div>
            
            <div className={style['maintenance-form-input']}>
                <label htmlFor="type">Tipo de vehículo:</label>
                <input type="text" placeholder="Tipo de vehículo" {...register("vehicleType", {required: true, minLength: 2, maxLength: 30, pattern: /^[A-Za-z\s]{2,30}$/})}/> 
                {errors.vehicleType?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.vehicleType?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de vehículo debe tener al menos 2 caracteres!</p>}
                {errors.vehicleType?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de vehículo no debe tener mas de 30 caracteres!</p>}
                {errors.vehicleType?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de tipo de vehículo inválido!</p>}
            </div>
            
            <div className={style['maintenance-form-input']}>
                <label htmlFor="maintenance-type">Tipo de mantenimiento:</label>
                <input type="text" placeholder="Tipo de mantenimiento" {...register("maintenanceType", {required: true, minLength: 7, maxLength: 30, pattern: /^[A-Za-z\s]{2,30}$/})}/> 
                {errors.maintenanceType?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.maintenanceType?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de mantenimiento debe tener al menos 7 caracteres!</p>}
                {errors.maintenanceType?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de mantenimiento no debe tener mas de 30 caracteres!</p>}
                {errors.maintenanceType?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de tipo de mantenimiento inválido!</p>}
            </div>
            
            </div>
            <div className={style["maintenance-form-observations"]}>
            <div className={style['maintenance-form-input']}>
                <label htmlFor="maintenance-notes">Observaciones</label>
                {/* aca se registra las validaciones de el campo como observaciones, se requiere que el campo sea obligatorio con una longitud minima de 5 caracteres y maxima de 30 */}
                <input type="text" placeholder="Observaciones" {...register("observations", {required: true, minLength: 5, maxLength: 30})}/> 
                {/* manejo de errores ], aca se senala el tipo de error y se le especifica el mensaje */}
                {errors.observations?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                {errors.observations?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> La observacion debe tener al menos 5 caracteres!</p>}
                {errors.observations?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> La observacion no debe tener mas de 30 caracteres!</p>}
            </div> 
            </div>
            <div className={style["maintenance-form-buttons"]}>
            <button className="save" type="submit">Agendar</button>
            <button className='history' type='submit'>Historial de contratos</button>
            </div>
            </form>
        </div>
        </>

    )
     
}
export default MaintenanceForm;