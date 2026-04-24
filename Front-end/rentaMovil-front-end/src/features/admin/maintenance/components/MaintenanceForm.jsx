import style from '../components/MaintenanceForm.module.css';
import ButtonBack from '../../../../shared/components/ButtonBack';
import { AiOutlineDashboard } from "react-icons/ai";
import Animation from '../../../../shared/components/layout/Animation';
import { useState } from 'react';
import ValidateDate from './ValidateDate';
//se instala librerio de home koo form para manejejar formulario validaciones
// se instala en la terminal con : npm install react-hook-form

import { useForm } from 'react-hook-form';

function MaintenanceForm() {
    /* // se inicializa el hook useForm para manejar el estado del formulario
    // el register se encargara de registrar cada campo de los inputs para su validacion
    // formState se encarga de manejar el estado del formulario, como errores, si esta sucio, etc
    // hadleSubmit se encarga de manejar el submit del formulario, validando los campos antes de enviar los datos */
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [mos, setmos] = useState(false);
    const [isLoading, setIslodain] = useState(false);
    /* por medio de esta fucion se maneja el envio de los datos del formulario */
    function insert(data) {
        setIslodain(true);  // botón muestra "Agendando..."
        setmos(true);       // arranca la animación

        setTimeout(() => {
            setmos(false);
            reset();
            setIslodain(false); // se apaga cuando termina la animación
        }, 2200);
    }


    return (
        <>
            <div className={style['maintenance-container']}>
                <h2>Registre un nuevo mantenimiento</h2>

                <form className={style['maintenance-form']} onSubmit={handleSubmit(insert)}>
                    <div className={style["maintenance-form-left"]}>
                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="plate">Placa:</label>
                            <input type="text" placeholder="Placa ej: ABC123"
                                {...register("plate", {
                                    required: "La placa es obligatoria.",
                                    pattern: {
                                        value: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/,
                                        message: "Formato inválido. Carro: ABC123"
                                    },
                                    onChange: (e) => { e.target.value = e.target.value.toUpperCase() }
                                })} />

                            {errors.plate && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.plate.message}
                                </p>

                            )}
                        </div>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="model">Modelo:</label>
                            <input
                                type="text"
                                placeholder="Ej: Volkswagen Gol, Crolla, Tesla Model 3... "

                                {...register("model", {
                                    required: "El modeolo es obligatorio",
                                    minLength: { value: 2, message: "El modelo debe tener al menos 2 caracteres." },
                                    maxLength: { value: 30, message: "El modelo no debe superar 30 caracteres." },
                                    pattern: {
                                        value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                        message: "El modelo solo puede contener letras, números y guiones."
                                    }
                                })}
                            />
                            {errors.model && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.model.message}
                                </p>
                            )} </div>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="date">Fecha:</label>
                            <input type="date" placeholder="Fecha"
                                {...register("date", {
                                    required: "la fecha es obligatoria",
                                    validate: ValidateDate
                                })}
                            />
                            {errors.date && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.date.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={style["maintenance-form-right"]}>
                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="brand">Marca:</label>
                            <input
                                type="text"
                                placeholder="Ej: Chevrolet, Renault, Toyota...."
                                list='brand-options'
                                {...register("brand", {
                                    required: "La marca es oobligatoria",
                                    minLength: { value: 2, message: "Mínimo 2 caracteres." },
                                    maxLength: { value: 30, message: "Máximo 30 caracteres." },
                                    pattern: {
                                        value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                        message: "La marca solo puede contener letras, números y guiones."
                                    }
                                })}
                            />
                            <datalist id="brand-options">
                                <option value="Chevrolet" />
                                <option value="Renault" />
                                <option value="Toyota" />
                                <option value="Mazda" />
                                <option value="Kia" />
                                <option value="Hyundai" />
                                <option value="Nissan" />
                                <option value="Ford" />
                                <option value="Volkswagen" />
                                <option value="BMW" />
                                <option value="Mercedes-Benz" />
                                <option value="Honda" />
                                <option value="Suzuki" />
                                <option value="Bajaj" />
                                <option value="Yamaha" />
                            </datalist>

                            {errors.brand && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.brand.message}
                                </p>

                            )} </div>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="type">Tipo de vehículo:</label>
                            <select
                                {...register("vehicleType", {
                                    required: "Debes seleccionar el tipo de vehículo.",
                                    validate: value => value !== "" || "Debes seleccionar el tipo de vehículo."
                                })}
                                defaultValue="">
                                <option value="" disabled>Selecciona un tipo...</option>
                                <optgroup label="Automóviles">
                                    <option value="Sedán">Sedán</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Camioneta">Camioneta</option>
                                    <option value="Pickup">Pickup</option>
                                    <option value="Van">Van</option>
                                    <option value="Coupé">Coupé</option>
                                </optgroup>
                                <optgroup label="Carga">
                                    <option value="Camión">Camión</option>
                                    <option value="Tractocamión">Tractocamión</option>
                                    <option value="Furgón">Furgón</option>
                                </optgroup>
                            </select>
                            {errors.vehicleType && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.vehicleType.message}
                                </p>
                            )}</div>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="maintenanceType">Tipo de mantenimiento:</label>
                            <input
                                type="text"
                                placeholder="Ej: Cambio de aceite, Revisión de frenos..."
                                list="maintenance-options"
                                {...register("maintenanceType", {
                                    required: "El tipo de mantenimiento es obligatorio.",
                                    minLength: { value: 3, message: "Mínimo 3 caracteres." },
                                    maxLength: { value: 60, message: "Máximo 60 caracteres." },
                                    pattern: {
                                        value: /^[A-Za-zÀ-ÿ0-9\s\-\,\.]{3,60}$/,
                                        message: "Solo se permiten letras, números, guiones y comas."
                                    }
                                })}
                            />
                            <datalist id="maintenance-options">
                                <option value="Cambio de aceite" />
                                <option value="Cambio de filtros" />
                                <option value="Revisión de frenos" />
                                <option value="Cambio de llantas" />
                                <option value="Alineación y balanceo" />
                                <option value="Revisión general" />
                                <option value="Reparación de motor" />
                                <option value="Reparación de frenos" />
                                <option value="Reparación eléctrica" />
                                <option value="Reparación de suspensión" />
                                <option value="Reparación de transmisión" />
                                <option value="Lavado" />
                                <option value="Pintura" />
                                <option value="Latonería" />
                            </datalist>

                            {errors.maintenanceType && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.maintenanceType.message}
                                </p>
                            )}
                        </div>

                    </div>
                    <div className={style["maintenance-form-observations"]}>
                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="maintenance-notes">Observaciones</label>
                            {/* aca se registra las validaciones de el campo como observaciones, se requiere que el campo sea obligatorio con una longitud minima de 5 caracteres y maxima de 30 */}
                            <textarea
                                placeholder="Observaciones"
                                className={style["maintenance-observatios"]}
                                rows={2}
                                {...register("observations", {
                                    minLength: { value: 5, message: "Mínimo 5 caracteres." },
                                    maxLength: { value: 200, message: "Máximo 200 caracteres." }
                                })}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';         /* // resetea la altura */
                                    e.target.style.height = e.target.scrollHeight + 'px'; // crece según el contenido
                                }} />
                            {/* manejo de errores ], aca se senala el tipo de error y se le especifica el mensaje */}
                            {errors.observations?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> La observacion debe tener al menos 5 caracteres</p>}
                            {errors.observations?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> La observacion no debe tener mas de 200 caracteres</p>}
                        </div>
                    </div>
                    <div className={style["maintenance-form-buttons"]}>
                        <button className="save" type="submit" disabled={isLoading}>
                            {isLoading ? "Angendando mantenimiento" : "Agendar mantenimiento"}
                        </button>
                        <span className={style["vehicule-animation"]}>
                            {mos && <Animation />}
                        </span>
                        <button className='history' type='button'>Hiorial de contratos</button>
                    </div>
                </form>
            </div>
        </>

    )

}
export default MaintenanceForm;