import style from './VehicleForm.module.css';
import { AiOutlineDashboard } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Animation from '../../../../shared/components/layout/Animation';
import FileDialog from "../../../../shared/components/layout/FileDialog";
import { useTranslation } from 'react-i18next';

function VehicleForm() {
    const { t } = useTranslation();
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
                            <h2>{t('vehicleForm.title')}</h2>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="plate">{t('vehicleForm.plate')}</label>
                                <input type="text" placeholder={t('vehicleForm.placeholderPlate')}
                                    {...register("plate", {
                                        required: t('vehicleForm.requiredPlate'),
                                        pattern: {
                                            value: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/,
                                            message: t('vehicleForm.invalidPlate')
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
                                <label htmlFor="brand">{t('vehicleForm.brand')}</label>
                                <input
                                    type="text"
                                    placeholder={t('vehicleForm.placeholderBrand')}
                                    list='brand-options'
                                    {...register("brand", {
                                        required: t('vehicleForm.requiredBrand'),
                                        minLength: { value: 2, message: t('vehicleForm.minLenghtBrand') },
                                        maxLength: { value: 30, message: t('vehicleForm.maxLenghtBrand') },
                                        pattern: {
                                            value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                            message: t('vehicleForm.invalidBrand')
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
                                <label htmlFor="model">{t('vehicleForm.model')}</label>
                                <input
                                    type="text"
                                    placeholder={t('vehicleForm.placeholderModel')}
                                    {...register("model", {
                                        required: t('vehicleForm.requiredModel'),
                                        minLength: { value: 2, message: t('vehicleForm.minLenghtModel') },
                                        maxLength: { value: 30, message: t('vehicleForm.maxLenghtModel') },
                                        pattern: {
                                            value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                            message: t('vehicleForm.invalidModel')
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
                                <label htmlFor="type">{t('vehicleForm.Type')}</label>
                                <select
                                    {...register("vehicleType", {
                                        required: t('vehicleForm.requiredType'),
                                        validate: value => value !== "" || t('vehicleForm.requiredType')
                                    })}
                                    defaultValue="">
                                    <option value="" disabled>{t('vehicleForm.disabledType')}</option>
                                    <optgroup label={t('vehicleForm.labelType1')}>
                                        <option value="Sedán">Sedán</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="SUV">SUVs</option>
                                        <option value="Camioneta">Camioneta</option>
                                        <option value="Pickup">Pickup</option>
                                        <option value="Van">Van</option>
                                        <option value="Coupé">Coupé</option>
                                    </optgroup>
                                    <optgroup label={t('vehicleForm.labelType2')}>
                                        <option value="Camión">{t('vehicleForm.cargaType1')}</option>
                                        <option value="Tractocamión">{t('vehicleForm.cargaType2')}</option>
                                        <option value="Furgón">{t('vehicleForm.cargaType3')}</option>
                                    </optgroup>
                                </select>
                                {errors.vehicleType && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.vehicleType.message}
                                    </p>
                                )}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="fuelType">{t('vehicleForm.FuelType')}</label>
                                <select
                                    {...register("fuelType", {
                                        required: t('vehicleForm.requiredFuelType'),
                                        validate: value => value !== "" || t('vehicleForm.requiredFuelType')
                                    })}
                                    defaultValue="">
                                    <option value="" disabled>{t('vehicleForm.disabledFuelType')}</option>
                                    <option value="Gasolina">{t('vehicleForm.fuelType1')}</option>
                                    <option value="Diésel">{t('vehicleForm.fuelType2')}</option>
                                    <option value="Eléctrico">{t('vehicleForm.fuelType4')}</option>
                                    <option value="Híbrido">{t('vehicleForm.fuelType3')}</option>
                                    <option value="Gas natural">{t('vehicleForm.fuelType5')}</option>
                                    <option value="Gas propano">{t('vehicleForm.fuelType6')}</option>
                                </select>
                                {errors.fuelType && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.fuelType.message}
                                    </p>
                                )}
                            </div>
                            <div className={style['vehicle-form-input']}>
                                <label htmlFor="location">{t('vehicleForm.location')}</label>
                                <input
                                    type="text"
                                    placeholder={t('vehicleForm.placeholderLocation')}
                                    {...register("location", {
                                        required: t('vehicleForm.requiredLocation'),
                                        minLength: { value: 2, message: t('vehicleForm.minLenghtLocation') },
                                        maxLength: { value: 100, message: t('vehicleForm.maxLenghtLocation') },
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s\.\,\#\-]{2,100}$/,
                                            message: t('vehicleForm.invalidLocation')
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
                    <button className={style.save} type="submit" disabled={isLoading}>
                        {isLoading ? t('vehicleForm.saving') : t('vehicleForm.saveVehicle')}
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