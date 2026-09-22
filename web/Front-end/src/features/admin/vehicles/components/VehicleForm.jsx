import style from './VehicleForm.module.css';
import { AiOutlineExclamationCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Animation from '../../../../shared/components/layout/Animation';
import FileDialog from "../../../../shared/components/layout/FileDialog";
import { useTranslation } from 'react-i18next';
import { getValidVehicleYearRange, validateVehicleYear } from '../../../../shared/utils/calculateAge';

function VehicleForm() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm();

    const [mos, setmos] = useState(false);
    const [vehicleFile, setVehicleFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { minYear, maxYear, currentYear } = getValidVehicleYearRange(1);

    const handleFileChange = (file) => {
        setVehicleFile(file);
        if (file) clearErrors('vehicleImage');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    async function insert(data) {
        if (!vehicleFile) {
            setError('vehicleImage', { type: 'required', message: 'Este apartado es obligatorio' });
            return;
        }

        setIsLoading(true);

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
            setmos(true);
            setTimeout(() => {
                setmos(false);
                setVehicleFile(null);
                reset();
            }, 2200);
        } catch (err) {
            console.error('Error subiendo imagen:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={style['vehicle-form-wrapper']}>
            <header className={style['page-header']}>
                <h1 className={style['page-title']}>{t('vehicleForm.title')}</h1>
                <p className={style['page-subtitle']}>{t('vehicleForm.subtitle')}</p>
            </header>

            <form className={style['form-container']} onSubmit={handleSubmit(insert)}>
                <section className={style['vehicle-card']}>
                    <div className={style['fields-grid']}>

                        {/* Columna Izquierda */}
                        <div className={style['col']}>
                            {/* Placa */}
                            <div className={style['input-group']}>
                                <label htmlFor="plate">
                                    {t('vehicleForm.plate')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.plate ? style['input-error'] : ''}`}>
                                    <input
                                        type="text"
                                        id="plate"
                                        placeholder={t('vehicleForm.placeholderPlate')}
                                        {...register("plate", {
                                            required: t('vehicleForm.requiredPlate'),
                                            pattern: {
                                                value: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/,
                                                message: t('vehicleForm.invalidPlate')
                                            },
                                            onChange: (e) => { e.target.value = e.target.value.toUpperCase(); }
                                        })}
                                    />
                                    {errors.plate && <AiOutlineExclamationCircle className={style['error-icon']} />}
                                </div>
                                {errors.plate && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.plate.message}
                                    </p>
                                )}
                            </div>

                            {/* Modelo */}
                            <div className={style['input-group']}>
                                <label htmlFor="model">
                                    {t('vehicleForm.model')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.model ? style['input-error'] : ''}`}>
                                    <input
                                        type="text"
                                        id="model"
                                        placeholder={t('vehicleForm.placeholderModel')}
                                        {...register("model", {
                                            required: t('vehicleForm.requiredModel'),
                                            minLength: { value: 2, message: t('vehicleForm.minLenghtModel') },
                                            maxLength: { value: 30, message: t('vehicleForm.maxLenghtModel') }
                                        })}
                                    />
                                </div>
                                {errors.model ? (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.model.message}
                                    </p>
                                ) : (
                                    <span className={style['helper-text']}>{t('vehicleForm.modelHelperText')}</span>
                                )}
                            </div>

                            {/* Capacidad */}
                            <div className={style['input-group']}>
                                <label htmlFor="capacity">
                                    {t('vehicleForm.capacity')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.capacity ? style['input-error'] : ''}`}>
                                    <input
                                        type="number"
                                        id="capacity"
                                        placeholder="5"
                                        {...register("capacity", {
                                            required: t('vehicleForm.capacityRequired'),
                                            min: { value: 1, message: t('vehicleForm.minLenghtCapacity') },
                                            max: { value: 100, message: t('vehicleForm.maxLenghtCapacity') }
                                        })}
                                    />
                                    <span className={style['input-suffix']}>{t('vehicleForm.passengersSuffix')}</span>
                                </div>
                                {errors.capacity && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.capacity.message}
                                    </p>
                                )}
                            </div>

                            {/* Año */}
                            <div className={style['input-group']}>
                                <label htmlFor="age">
                                    {t('vehicleForm.age')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.age ? style['input-error'] : ''}`}>
                                    <input
                                        type="number"
                                        id="age"
                                        placeholder={`Ej: ${currentYear || 2026}`}
                                        {...register("age", {
                                            required: t('vehicleForm.ageRequired'),
                                            validate: (value) => validateVehicleYear(value, 1) === true || `${t('vehicleForm.invalidAge')} (${minYear} - ${maxYear})`
                                        })}
                                    />
                                </div>
                                {errors.age && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.age.message}
                                    </p>
                                )}
                            </div>

                            {/* Tipo / Categoría */}
                            <div className={style['input-group']}>
                                <label htmlFor="vehicleType">
                                    {t('vehicleForm.Type')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.vehicleType ? style['input-error'] : ''}`}>
                                    <select
                                        id="vehicleType"
                                        defaultValue=""
                                        {...register("vehicleType", {
                                            required: t('vehicleForm.requiredType'),
                                            validate: value => value !== "" || t('vehicleForm.requiredType')
                                        })}
                                    >
                                        <option value="" disabled hidden>{t('vehicleForm.disabledType')}</option>
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
                                </div>
                                {errors.vehicleType && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.vehicleType.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Columna Derecha */}
                        <div className={style['col']}>
                            {/* Precio */}
                            <div className={style['input-group']}>
                                <label htmlFor="price">
                                    {t('vehicleForm.price')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.price ? style['input-error'] : ''}`}>
                                    <span className={style['input-prefix']}>$</span>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="150000"
                                        {...register("price", {
                                            required: t('vehicleForm.priceRequired'),
                                            min: { value: 0, message: t('vehicleForm.minLenghtPrice') },
                                            max: { value: 100000000, message: t('vehicleForm.maxLenghtPrice') }
                                        })}
                                    />
                                    <span className={style['input-suffix']}>{t('vehicleForm.perDaySuffix')}</span>
                                </div>
                                {errors.price && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.price.message}
                                    </p>
                                )}
                            </div>

                            {/* Ubicación / Sucursal */}
                            <div className={style['input-group']}>
                                <label htmlFor="location">
                                    {t('vehicleForm.location')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.location ? style['input-error'] : ''}`}>
                                    <select id="location" {...register("location", { required: t('vehicleForm.requiredLocation') })} defaultValue="bogota">
                                        <option value="bogota">Sede Bogotá Norte — Calle 100 #15-20</option>
                                        <option value="medellin">Sede Medellín Poblado</option>
                                        <option value="cali">Sede Cali Cañasgordas</option>
                                    </select>
                                </div>
                                {errors.location && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.location.message}
                                    </p>
                                )}
                            </div>

                            {/* Kilometraje */}
                            <div className={style['input-group']}>
                                <label htmlFor="mileage">
                                    {t('vehicleForm.mileage')} <span className={style.required}>*</span>
                                </label>
                                <div className={`${style['input-wrapper']} ${errors.mileage ? style['input-error'] : ''}`}>
                                    <input
                                        type="number"
                                        id="mileage"
                                        placeholder="12500"
                                        {...register("mileage", {
                                            required: t('vehicleForm.mileageRequired'),
                                            min: { value: 0, message: t('vehicleForm.minLenghtMileage') },
                                            max: { value: 1000000, message: t('vehicleForm.maxLenghtMileage') }
                                        })}
                                    />
                                    <span className={style['input-suffix']}>{t('vehicleForm.kmSuffix')}</span>
                                </div>
                                {errors.mileage && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.mileage.message}
                                    </p>
                                )}
                            </div>

                            {/* Subida de Imagen */}
                            <div className={style['input-group']}>
                                <label>{t('vehicleForm.imgp3')}</label>
                                <div className={style.fileDialogs}>
                                    <FileDialog onFileChange={handleFileChange} file={vehicleFile} />
                                </div>
                                {errors.vehicleImage && (
                                    <p className={style['error-message']}>
                                        <AiOutlineExclamationCircle /> {errors.vehicleImage.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer Informativo */}
                    <div className={style['info-footer']}>
                        <div className={style['info-item']}>
                            <AiOutlineInfoCircle />
                            <span>{t('vehicleForm.infoFooter')}</span>
                        </div>
                        <div className={style['status-item']}>
                            <span>{t('vehicleForm.initialStatus')}</span>
                            <span className={style['status-tag']}>
                                <span className={style['status-dot']}></span> {t('vehicleForm.available')}
                            </span>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className={style['actions']}>
                        <button className={style['btn-cancel']} type="button" onClick={handleCancel}>
                            {t('vehicleForm.cancel')}
                        </button>
                        <button className={style['btn-save']} type="submit" disabled={isLoading}>
                            + {isLoading ? t('vehicleForm.saving') : t('vehicleForm.saveVehicle')}
                        </button>
                    </div>

                    {mos && <div className={style['vehicule-animation']}><Animation /></div>}
                </section>
            </form>
        </div>
    );
}

export default VehicleForm;