import style from './MaintenanceForm.module.css';
import { AiOutlineDashboard } from 'react-icons/ai';
import Animation from '../../../../shared/components/layout/Animation';
import { useMemo, useState } from 'react';
import ValidateDate from './ValidateDate';
import { vehicles } from '../service/CarsMock';
import { useForm } from 'react-hook-form';

function MaintenanceForm() {
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
                            <h3>Vehículos para mantenimiento</h3>
                            <p>Busca por placa, nombre o estado:</p>
                        </div>
                    </div>

                    <input
                        type="text"
                        className={style['vehicle-search']}
                        placeholder="Buscar placa o vehículo"
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
                            <p className={style['vehicle-empty']}>No se encontraron vehículos.</p>
                        )}
                    </div>
                </div>
            </div>

            <form className={style['maintenance-form']} onSubmit={handleSubmit(insert)}>
                <div className={style['maintenance-form-left']}>
                    <div className={style['maintenance-continerfor']}>
                        <h2>Registre un nuevo mantenimiento</h2>

                        <div className={style['maintenance-form-input']}>
                            <label htmlFor="plate">Placa:</label>
                            <input
                                type="text"
                                placeholder="Placa ej: ABC123"
                                readOnly={Boolean(selectedVehicle)}
                                {...register('plate', {
                                    required: 'La placa es obligatoria.',
                                    pattern: {
                                        value: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/,
                                        message: 'Formato inválido. Carro: ABC123'
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
                            <label htmlFor="model">Modelo:</label>
                            <input
                                type="text"
                                placeholder="Ej: Volkswagen Gol, Crolla, Tesla Model 3..."
                                readOnly={Boolean(selectedVehicle)}
                                {...register('model', {
                                    required: 'El modelo es obligatorio',
                                    minLength: { value: 2, message: 'El modelo debe tener al menos 2 caracteres.' },
                                    maxLength: { value: 30, message: 'El modelo no debe superar 30 caracteres.' },
                                    pattern: {
                                        value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                        message: 'El modelo solo puede contener letras, números y guiones.'
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
                            <label htmlFor="date">Fecha:</label>
                            <input
                                type="date"
                                placeholder="Fecha"
                                {...register('date', {
                                    required: 'La fecha es obligatoria',
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
                                <label htmlFor="brand">Marca:</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Chevrolet, Renault, Toyota...."
                                    list="brand-options"
                                    readOnly={Boolean(selectedVehicle)}
                                    {...register('brand', {
                                        required: 'La marca es obligatoria',
                                        minLength: { value: 2, message: 'Mínimo 2 caracteres.' },
                                        maxLength: { value: 30, message: 'Máximo 30 caracteres.' },
                                        pattern: {
                                            value: /^[A-Za-z0-9\s\-]{2,30}$/,
                                            message: 'La marca solo puede contener letras, números y guiones.'
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
                                <label htmlFor="type">Seleccione el vehículo:</label>
                                <select
                                    {...register('vehicleType', {
                                        required: 'Debes seleccionar el tipo de vehículo.',
                                        validate: (value) => value !== '' || 'Debes seleccionar el tipo de vehículo.'
                                    })}
                                    defaultValue=""
                                >
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

                            <div className={style['maintenance-form-input']}>
                                <label htmlFor="maintenanceType">Tipo de mantenimiento:</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Cambio de aceite, Revisión de frenos..."
                                    list="maintenance-options"
                                    {...register('maintenanceType', {
                                        required: 'El tipo de mantenimiento es obligatorio.',
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
                                        maxLength: { value: 60, message: 'Máximo 60 caracteres.' },
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s\-\,\.]{3,60}$/,
                                            message: 'Solo se permiten letras, números, guiones y comas.'
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

                        <div className={style['maintenance-form-observations']}>
                            <div className={style['maintenance-form-input']}>
                                <label htmlFor="maintenance-notes">Observaciones</label>
                                <textarea
                                    placeholder="Observaciones"
                                    className={style['maintenance-observatios']}
                                    rows={2}
                                    {...register('observations', {
                                        minLength: { value: 5, message: 'Mínimo 5 caracteres.' },
                                        maxLength: { value: 200, message: 'Máximo 200 caracteres.' }
                                    })}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                />
                                {errors.observations?.type === 'minLength' && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> La observación debe tener al menos 5 caracteres
                                    </p>
                                )}
                                {errors.observations?.type === 'maxLength' && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> La observación no debe tener más de 200 caracteres
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={style['maintenance-form-buttons']}>
                        <button className="save" type="submit" disabled={isLoading}>
                            {isLoading ? 'Agendando mantenimiento' : 'Agendar mantenimiento'}
                        </button>
                        <span className={style['vehicule-animation']}>
                            {mos && <Animation />}
                        </span>
                        <button className="history" type="button">Historial de contratos</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MaintenanceForm;