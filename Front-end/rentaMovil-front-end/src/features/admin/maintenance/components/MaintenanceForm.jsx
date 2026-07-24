import style from './MaintenanceForm.module.css';
import { AiOutlineDashboard } from 'react-icons/ai';
import Animation from '../../../../shared/components/layout/Animation';
import { useMemo, useState } from 'react';
import ValidateDate from './ValidateDate';
import { vehicles } from '../service/CarsMock';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
function MaintenanceForm() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();
    const [mos, setMos] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    function insert(data) {
        setIsLoading(true);
        setMos(true);

        setTimeout(() => {
            setMos(false);
            reset();
            setSelectedVehicle(null);
            setSearch('');
            setIsLoading(false);
        }, 2200);
    }

    const filteredVehicles = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) {
            return vehicles;
        }

        return vehicles.filter((vehicle) =>
            [vehicle.placa, vehicle.name, vehicle.brand, vehicle.model, vehicle.state]
                .some((value) => value?.toLowerCase().includes(query))
        );
    }, [search]);

    function selectVehicle(vehicle) {
        setSelectedVehicle(vehicle);
        setValue('plate', vehicle.placa, { shouldValidate: true });
        setValue('model', vehicle.model, { shouldValidate: true });
        setValue('brand', vehicle.brand, { shouldValidate: true });
    }

    return (
        <div className={style['maintenance-container']}>
            <div className={style['maintenance-sidebar']}>
                <div className={style['maintenance-panel']}>
                    <div className={style['panel-header']}>
                        <div>
                            <h3>{t('MaintenanceForm.title')}</h3>
                            <p>{t('MaintenanceForm.search')}</p>
                        </div>
                    </div>

                    <input
                        type="text"
                        className={style['vehicle-search']}
                        placeholder={t('MaintenanceForm.search')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className={style['vehicle-list']}>
                        {filteredVehicles.length > 0 ? (
                            filteredVehicles.map((vehicle) => (
                                <button
                                    key={vehicle.id}
                                    type="button"
                                    className={`${style['vehicle-card']} ${selectedVehicle?.id === vehicle.id ? style['vehicle-card--active'] : ''}`}
                                    onClick={() => selectVehicle(vehicle)}
                                >
                                    <div className={style['vehicle-card-top']}>
                                        <strong>{vehicle.placa}</strong>
                                        <span className={`${style['vehicle-state']} ${style[vehicle.state.replace(' ', '-').toLowerCase()]}`}>
                                            <span className={style['state-dot']} />
                                            {vehicle.state}
                                        </span>
                                    </div>
                                    <img src={vehicle.img} alt={vehicle.name} />
                                    <p>{vehicle.name}</p>
                                    <small>{vehicle.brand} • {vehicle.model}</small>
                                </button>
                            ))
                        ) : (
                            <p className={style['vehicle-empty']}>{t('MaintenanceForm.noFound')}</p>
                        )}
                    </div>
                </div>
            </div>

            <form className={style['maintenance-form']} onSubmit={handleSubmit(insert)}>
                <div className={style['maintenance-form-left']}>
                    <div className={style['maintenance-continerfor']}>
                        <h2>{t('MaintenanceForm.newMaintenance')}</h2>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="plate">{t('CheckStatus.modal.plate')}</label>
                            <input
                                type="text"
                                placeholder={t('CheckStatus.modal.platePlaceholder')}
                                readOnly={Boolean(selectedVehicle)}
                                {...register('plate', {
                                    required: t('CheckStatus.modal.requiredPlate'),
                                    pattern: {
                                        value: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/,
                                        message: t('CheckStatus.modal.formatInvalidPlate')
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value.toUpperCase();
                                    }
                                })}
                            />

                            {errors.plate && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.plate.message}
                                </p>
                            )}
                        </div>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="model">{t('MaintenanceForm.model')}</label>
                            <input
                                type="text"
                                placeholder={t('MaintenanceForm.modelPlaceholder')}
                                readOnly={Boolean(selectedVehicle)}
                                {...register('model', {
                                    required: t('MaintenanceForm.requiredModel'),
                                    minLength: { value: 2, message: t('MaintenanceForm.requiredModelMinLength') },
                                    maxLength: { value: 30, message: t('MaintenanceForm.requiredModelMaxLength') },
                                    pattern: {
                                        value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                        message: t('MaintenanceForm.formatInvalidModel')
                                    }
                                })}
                            />
                            {errors.model && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.model.message}
                                </p>
                            )}
                        </div>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="date">{t('MaintenanceForm.date')}</label>
                            <input
                                type="date"
                                placeholder={t('MaintenanceForm.datePlaceholder')}
                                {...register('date', {
                                    required: t('MaintenanceForm.requiredDate'),
                                    validate: ValidateDate
                                })}
                            />
                            {errors.date && (
                                <p className={style['error-message']}>
                                    <AiOutlineDashboard /> {errors.date.message}
                                </p>
                            )}
                        </div>

                        <div className={style['maintenance-form-right']}>
                            <div className={style['maintenance-form-input']}>
                                <label htmlFor="brand">{t('MaintenanceForm.brand')}</label>
                                <input
                                    type="text"
                                    placeholder={t('MaintenanceForm.brandPlaceholder')}
                                    list="brand-options"
                                    readOnly={Boolean(selectedVehicle)}
                                    {...register('brand', {
                                        required: t('MaintenanceForm.requiredBrand'),
                                        minLength: { value: 2, message: t('MaintenanceForm.minLenghtBrand') },
                                        maxLength: { value: 30, message: t('MaintenanceForm.maxLenghtBrand') },
                                        pattern: {
                                            value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                            message: t('MaintenanceForm.ivalidBrand')
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


                            <div className={style['maintenance-form-input']}>
                                <label htmlFor="maintenanceType">{t("MaintenanceForm.Type")}</label>
                                <input
                                    type="text"
                                    placeholder={t("MaintenanceForm.placeholderType")}
                                    list="maintenance-options"
                                    {...register('maintenanceType', {
                                        required: t("MaintenanceForm.requiredType"),
                                        minLength: { value: 3, message: t("MaintenanceForm.minLenghtType") },
                                        maxLength: { value: 60, message: t("MaintenanceForm.maxLenghtType") },
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s\-\,\.]{3,60}$/,
                                            message: t("MaintenanceForm.invalidType")
                                        }
                                    })}
                                />
                                <datalist id="maintenance-options">
                                    <option value={t("MaintenanceForm.options.option1")} />
                                    <option value={t("MaintenanceForm.options.option2")} />
                                    <option value={t("MaintenanceForm.options.option3")} />
                                    <option value={t("MaintenanceForm.options.option4")} />
                                    <option value={t("MaintenanceForm.options.option5")} />
                                    <option value={t("MaintenanceForm.options.option6")} />
                                    <option value={t("MaintenanceForm.options.option7")} />
                                    <option value={t("MaintenanceForm.options.option8")} />
                                    <option value={t("MaintenanceForm.options.option9")} />
                                    <option value={t("MaintenanceForm.options.option10")} />
                                    <option value={t("MaintenanceForm.options.option11")} />
                                    <option value={t("MaintenanceForm.options.option12")} />
                                    <option value={t("MaintenanceForm.options.option13")} />
                                    <option value={t("MaintenanceForm.options.option14")} />
                                </datalist>

                                {errors.maintenanceType && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.maintenanceType.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={style['maintenance-form-observations']}>
                            <div className={style['maintenance-form-input']}>
                                <label htmlFor="maintenance-notes">{t("MaintenanceForm.observations")}</label>
                                <textarea
                                    placeholder={t("MaintenanceForm.placeholderObservations")}
                                    className={style['maintenance-observatios']}
                                    rows={2}
                                    {...register('observations', {
                                        minLength: { value: 5, message: t("MaintenanceForm.minLenghtObservations") },
                                        maxLength: { value: 200, message: t("MaintenanceForm.maxLenghtObservations") }
                                    })}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                />
                                {errors.observations?.type === 'minLength' && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.observations.message}
                                    </p>
                                )}
                                {errors.observations?.type === 'maxLength' && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.observations.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style['maintenance-form-buttons']}>
                        <button className="save" type="submit" disabled={isLoading}>
                            {isLoading ? t("MaintenanceForm.saving") : t("MaintenanceForm.save")}
                        </button>
                        <span className={style['vehicule-animation']}>
                            
                            {mos && <Animation />}
                        </span>
                        <button className="history" type="button" onClick={() => navigate('/History')}>
                            {t("MaintenanceForm.history")}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MaintenanceForm;