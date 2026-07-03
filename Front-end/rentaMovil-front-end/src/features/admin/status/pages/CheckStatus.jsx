import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import Footer from '../../../../shared/components/layout/Footer';
import img from "../../../../assets/carts/viejo.JPG";
import CartVehiculeStatus from "../components/CartVehiculeStatus";
import FiltrerStatus from "../components/FiltrerStatus";
import FleetChart from "../components/FleetChart";
import Animation from "../../../../shared/components/layout/Animation";
import style from "../pages/CheckStatus.module.css";
import FileDialog from "../../../../shared/components/layout/FileDialog";
import { useForm} from "react-hook-form";
import { AiOutlineDashboard } from "react-icons/ai";

function CheckStatus() {
    const { t } = useTranslation();
    const [query, setSearch] = useState("");
    const [filterState, setFilterState] = useState("Todos");
    const { register, formState: { errors }, handleSubmit, reset, setError, clearErrors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicles] = useState([
        {
            name: "Vehículo 1",
            text: "Esste vehiculo tiene contrato cossssssssssssssssssssssssssssssssssssssssssssssssssssn la naturaleza",
            state: "Disponible",
            plate: "ABC123",
            img: img,
            ubication: "Ubicación 1",
        },
        {
            name: "Vehículo 2",
            text: "Presenta inconvenientes en la trasmicion, en el motor, en la culata, en la bomba de gasolina, en el tiempo, en la supencion, en la ",
            state: "En mantenimiento",
            plate: "DEF456",
            img: img,
            ubication: "Ubicación 2",
        },
        {
            name: "Vehículo 3",
            text: "Esste vehiculo tiene contrato con la. y muchod ptoblemas mas naturaleza",
            state: "En uso",
            plate: "GHI789",
            img: img,
            ubication: "Ubicación 3",
        },
        {
            name: "Vehículo 4",
            text: "Esste vehiculo como por ejemplotiene contrato con la naturaleza",
            state: "En uso",
            plate: "JKL012",
            img: img,
            ubication: "Ubicación 4",
        },
    ]);
    const [vehicleFile, setVehicleFile] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const filteredVehicles = vehicles
        .filter((v) => filterState === "Todos" || v.state === filterState)
        .filter((v) => v.name.toLowerCase().includes(query.toLowerCase()) || v.plate.toLowerCase().includes(query.toLowerCase()));

    const handleFileChange = (file) => {
        setVehicleFile(file);
    };

    const openEditModal = (vehicle) => {
        setSelectedVehicle(vehicle);
        // populate react-hook-form fields with the vehicle values
        reset({
            name: vehicle.name,
            plate: vehicle.plate,
            state: vehicle.state,
            ubication: vehicle.ubication,
            description: vehicle.text,
        });
        setVehicleFile(vehicle.img || null);
    };

    const closeModal = () => {
        setSelectedVehicle(null);
        reset();
        setVehicleFile(null);
    };
    const onSubmit = (data) => {
        if (!selectedVehicle) return;

        const newImage =
            vehicleFile instanceof File
                ? URL.createObjectURL(vehicleFile)
                : vehicleFile ?? selectedVehicle.img;

        setVehicles((prev) =>
            prev.map((vehicle) =>
                vehicle.plate === selectedVehicle.plate
                    ? {
                          ...vehicle,
                          name: data.name,
                          plate: data.plate,
                          state: data.state,
                          ubication: data.ubication,
                          text: data.description,
                          img: newImage,
                      }
                    : vehicle
            )
        );

        closeModal();
    };

    return (
        <>
            <NavBarAdmin />
            <div className={style["card-check"]}>
                <div className={style["card-container-left"]}>
                    <div className={style["card-container-setSearch"]}>
                        <FiltrerStatus query={query} setSearch={setSearch} filterState={filterState} setFilterState={setFilterState} />
                    </div>
                    <div className={style["card-container-fleetc"]}>
                        <FleetChart vehicles={vehicles} />
                    </div>
                </div>
                <div className={style["card-container-right"]}>
                    <div className={style["card-container-status"]}>
                        {filteredVehicles.map((vehicle) => (
                            <CartVehiculeStatus
                                key={vehicle.plate}
                                {...vehicle}
                                onVerMas={() => openEditModal(vehicle)}
                            />
                        ))}
                    </div>
                </div>

                <Animation />
            </div>

            {selectedVehicle && (
                <div className={style["modal-overlay"]} onClick={closeModal}>
                    <div className={style["modal-modal"]} onClick={(e) => e.stopPropagation()}>
                        <div className={style["modal-header"]}>
                            <h3 className={style["modal-title"]}>Editar vehículo</h3>
                            <button type="button" className={style["modal-closeButton"]} onClick={closeModal} aria-label="Cerrar modal">
                                ×
                            </button>
                        </div>
                        <div className={style.modalForm}>
                            <div className={style.modalFields}>
                                <label>
                                    Nombre
                                    <input
                                        className={style["modal-input"]}
                                        {...register("name", {
                                            required: "El nombre es obligatorio",
                                            minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
                                            maxLength: { value: 50, message: "El nombre no puede exceder los 50 caracteres" },
                                            pattern: {
                                                value: /^[A-Za-z0-9\s\-]{2,30}$/, 
                                                message: t("formato de registro invalido")
                                            }
                                        })}
                                    />
                                    {errors.name && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.name.message}
                                    </p>
                                    )}
                                </label>
                                <label>   
                                    Placa
                                    <input
                                        className={style["modal-input"]}
                                        {...register("plate", {
                                        required: t('La placa es obligatoria'),
                                        minLength: { value: 2, message: t('La placa debe tener al menos 2 caracteres') },
                                        maxLength: { value: 30, message: t('La placa no puede exceder los 30 caracteres') },
                                        pattern: {
                                            value: /^[A-Z]{3}[0-9]{2}[A-Z0-9]?$/,
                                            message: t('Formato de placa inválido')
                                        },
                                        onChange: (e) => { e.target.value = e.target.value.toUpperCase() }
                                    })}
                                    />
                                    {errors.plate && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.plate.message}
                                    </p>
                                    )}
                                </label>
                                <label>
                                    Estado
                                    <select
                                        {...register("state")}
                                    >
                                        <option value="Disponible">Disponible</option>
                                        <option value="En mantenimiento">En mantenimiento</option>
                                        <option value="En uso">En uso</option>
                                        <option value="Reservado">Reservado</option>
                                    </select>
                                </label>
                                <label>
                                    Ubicación
                                    <input
                                        className={style["modal-input"]}
                                        {...register("ubication", {
                                            required: t('vehicleForm.requiredLocation'),
                                            minLength: { value: 2, message: t('vehicleForm.minLenghtLocation') },
                                            maxLength: { value: 100, message: t('vehicleForm.maxLenghtLocation') },
                                            pattern: {
                                                value: /^[A-Za-zÀ-ÿ0-9\s\.\,\#\-]{2,100}$/,
                                                message: t('vehicleForm.invalidLocation')
                                            }
                                        })}
                                />
                                {errors.ubication && (
                                    <p className={style['error-message']}>
                                        <AiOutlineDashboard /> {errors.ubication.message}
                                    </p>
                                )}
                                </label>
                                <label>
                                    Descripción
                                    <textarea
                                        className={style["modal-textarea"]}
                                        {...register("description", {
                                        minLength: { value: 5, message: "Mínimo 5 caracteres." },
                                        maxLength: { value: 200, message: "Máximo 200 caracteres." }
                                    })}
                                        onInput={(e) => {
                                        e.target.style.height = 'auto';         /* // resetea la altura */
                                        e.target.style.height = e.target.scrollHeight + 'px'; // crece según el contenido
                                    }}                                        
                                    />
                                    {errors.description && (
                                        <p className={style['error-message']}>
                                            <AiOutlineDashboard /> {errors.description.message}
                                        </p>
                                        )}
                                </label>
                            </div>
                            <div className={style.modalFileDialogWrapper}>
                                <label className={style["modal-fileLabel"]}>Imagen</label>
                                <FileDialog onFileChange={handleFileChange} file={vehicleFile} />
                            </div>
                        </div>
                        <div className={style["modal-footer"]}>
                            <button type="button" className={style["modal-cancelButton"]} onClick={closeModal}>
                                Cancelar
                            </button>
                            <button type="button" className={style["modal-submitButton"]} onClick={() => handleSubmit(onSubmit)()} disabled={isLoading}>
                                {isLoading ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default CheckStatus;
