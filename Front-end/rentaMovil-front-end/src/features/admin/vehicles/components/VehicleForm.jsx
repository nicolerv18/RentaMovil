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

    const handleFileChange = (file) => {
        setVehicleFile(file);
        if (file) clearErrors('vehicleImage');
    }
    
    async function insert(data) {
        if (!vehicleFile) {
            setError('vehicleImage', { type: 'required', message: 'Este apartado es obligatorio' });
            return;
        }

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
        } catch (err) {
            console.error('Error subiendo imagen:', err);
        }

        setmos(true);
        setVehicleFile(null);
        reset();
        setTimeout(() => setmos(false), 2200);//esto programa que dentro de 2200 cambie el estato de stmos a false 
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
                                <input type="text" placeholder="Placa" {...register("plate", { required: true, pattern: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/ })} />
                                {errors.plate?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                                {errors.plate?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> El formato de la placa no es válido!</p>}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="brand">Marca:</label>
                                <input type="text" placeholder="Marca" {...register("brand", { required: true, minLength: 2, maxLength: 30, pattern: /^[A-Za-z\s]{2,30}$/ })} />
                                {errors.brand?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                                {errors.brand?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> La marca debe tener al menos 2 caracteres!</p>}
                                {errors.brand?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> La marca no debe tener mas de 30 caracteres!</p>}
                                {errors.brand?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de marca inválido!</p>}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="model">Modelo:</label>
                                <input type="text" placeholder="Modelo" {...register("model", { required: true, pattern: /^[A-Za-z0-9\s]{2,30}$/ })} />
                                {errors.model?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                                {errors.model?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de modelo inválido!</p>}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="type">Tipo de vehículo:</label>
                                <input type="text" placeholder="Tipo de vehículo" {...register("vehicleType", { required: true, minLength: 2, maxLength: 30, pattern: /^[A-Za-z\s]{2,30}$/ })} />
                                {errors.vehicleType?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                                {errors.vehicleType?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de vehículo debe tener al menos 2 caracteres!</p>}
                                {errors.vehicleType?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de vehículo no debe tener mas de 30 caracteres!</p>}
                                {errors.vehicleType?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de tipo de vehículo inválido!</p>}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="fuelType">Tipo de combustible:</label>
                                <input type="text" placeholder="Tipo de combustible" {...register("fuelType", { required: true, minLength: 2, maxLength: 30, pattern: /^[A-Za-z\s]{2,30}$/ })} />
                                {errors.fuelType?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                                {errors.fuelType?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de combustible debe tener al menos 2 caracteres!</p>}
                                {errors.fuelType?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> El tipo de combustible no debe tener mas de 30 caracteres!</p>}
                                {errors.fuelType?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de tipo de combustible inválido!</p>}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="location">Ubicación:</label>
                                <input type="text" placeholder="Ubicación" {...register("location", { required: true, minLength: 2, maxLength: 100, pattern: /^[A-Za-z0-9\s]{2,100}$/ })} />
                                {errors.location?.type === "required" && <p className={style['error-message']}><AiOutlineDashboard /> Este campo es obligatorio!</p>}
                                {errors.location?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> La ubicación debe tener al menos 2 caracteres!</p>}
                                {errors.location?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> La ubicación no debe tener mas de 100 caracteres!</p>}
                                {errors.location?.type === "pattern" && <p className={style['error-message']}><AiOutlineDashboard /> Formato de ubicación inválido!</p>}
                            </div>
                        </div>

                        <div className={style.fileDialogs}> 
                            <FileDialog onFileChange={handleFileChange} file={vehicleFile} />
                            {errors.vehicleImage && (<p className={style['error-message']}><AiOutlineDashboard />{errors.vehicleImage?.message}</p>)}
                        </div>
                    </div>
                    <button className="save" type="submit">Guardar el vehículo</button>
                    <span className={style["vehicule-animation"]}>
                    {mos && <Animation />}
                    </span>
                </form>
            </div>
        </>
    );
}
export default VehicleForm;