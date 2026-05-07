import style from './VehicleForm.module.css';
import { AiOutlineDashboard } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Animation from '../../../../shared/components/layout/Animation';
import FileDialog from "../../../../shared/components/layout/FileDialog";

function VehicleForm() {
    const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm();
    const [mos, setmos] = useState(false);
    const [vehicleFile, setVehicleFile] = useState(null); // esto verificará el estado del fileDialog
    const [isLoading, setIsLoading] = useState(false);// agrega un estado de carga 

    const handleFileChange = (file) => {
        setVehicleFile(file);
        if (file) clearErrors('vehicleImage');
    }

    async function insert(data) {
        if (!vehicleFile) {
            setError('vehicleImage', { type: 'required', message: 'Este apartado es obligatorio' });
            return;
        }
        setIsLoading(true);
        // ejemplo: subir imagen a Cloudinary antes de resetear el formulario
        try {
            const formData = new FormData();
            formData.append('file', vehicleFile);
            formData.append('upload_preset', 'dav32erzro');
            formData.append('api_key', '172463377995151');

            const res = await fetch('https://api.cloudinary.com/v1_1/dz6ohgjub/image/upload', {
                method: 'POST',
                body: formData
            });
            const uploadResult = await res.json();
            data.image = uploadResult.secure_url || uploadResult.url;
            console.log('Formulario listo para enviar:', data);
            setmos(true);//arranca la animacion 
            setTimeout(() => {
                setmos(false)
                setVehicleFile(null);
                reset();
            }, 2200);//esto programa que dentro de 2200 cambie el estato de stmos a false 
        } catch (err) {
            console.error('Error subiendo imagen:', err);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className={style['vehicle-form']}>
                <form className={style['form-container']} onSubmit={handleSubmit(insert)}>
                    <div className={style['container-container']}>
                        <div className={style["vechicle-containerfor"]}>
                            <h2>Registre un nuevo vehículo</h2>
                            <div className={style['vehicle-form-input']}>
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
                            <div className={style['vehicle-form-input']}>
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

                                )}

                            </div>

                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="model">Modelo:</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Volkswagen Gol, Crolla, Tesla Model 3... "
                                    {...register("model", {
                                        required: "El modelo es obligatorio",
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
                                )}
                            </div>
                                <div className={style['vehicle-form-input']}>
                                <label htmlFor="price">Precio:</label>
                                <input
                                    type="number"
                                    placeholder="Ej: 100000"
                                    step="100"
                                    {...register('price', {
                                        required: 'El precio es obligatorio',
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'El precio debe ser mayor o igual a 0' },
                                        max: { value: 100000000, message: 'El precio no debe superar 100000000' }
                                    })}
                                />
                                {errors.price && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.price.message}
                                    </p>
                                )}
                            </div>
                            <div className={style['vehicle-form-input']}>
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
                                )}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="fuelType">Tipo de combustible:</label>
                                <select
                                    {...register("fuelType", {
                                        required: "Debes seleccionar el tipo de combustible.",
                                        validate: value => value !== "" || "Debes seleccionar el tipo de combustible."
                                    })}
                                    defaultValue="">
                                    <option value="" disabled>Selecciona un tipo...</option>
                                    <option value="Gasolina">Gasolina</option>
                                    <option value="Diésel">Diésel</option>
                                    <option value="Eléctrico">Eléctrico</option>
                                    <option value="Híbrido">Híbrido</option>
                                    <option value="Gas natural">Gas natural</option>
                                    <option value="Gas propano">Gas propano (GLP)</option>
                                </select>
                                {errors.fuelType && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.fuelType.message}
                                    </p>
                                )}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="location">Ubicación:</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Bogotá, Medellín,"
                                    {...register("location", {
                                        required: "La ubicación es obligatoria.",
                                        minLength: { value: 2, message: "La ubicación debe tener al menos 2 caracteres." },
                                        maxLength: { value: 100, message: "La ubicación no debe superar 100 caracteres." },
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s\.\,\#\-]{2,100}$/,
                                            message: "La ubicación contiene caracteres no permitidos."
                                        }
                                    })}
                                />
                                {errors.location && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.location.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={style.fileDialogs}>
                            <FileDialog onFileChange={handleFileChange} file={vehicleFile} />
                            {errors.vehicleImage && (<p className={style['error-message']}><AiOutlineDashboard />{errors.vehicleImage?.message}</p>)}
                        </div>
                    </div>
                    <button className="save" type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando' : 'Guardar el vehículo'}
                    </button>
                    <span className={style["vehicule-animation"]}>
                        {mos && <Animation />}
                    </span>
                </form>
            </div>
        </>
    );
}
export default VehicleForm;