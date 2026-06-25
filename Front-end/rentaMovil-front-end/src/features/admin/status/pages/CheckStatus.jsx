import { useState } from "react";
import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import Footer from '../../../../shared/components/layout/Footer';
import img from "../../../../assets/carts/viejo.JPG";
import CartVehiculeStatus from "../components/CartVehiculeStatus";
import FiltrerStatus from "../components/FiltrerStatus";
import FleetChart from "../components/FleetChart";
import Animation from "../../../../shared/components/layout/Animation";
import style from "../pages/CheckStatus.module.css";
import FileDialog from "../../../../shared/components/layout/FileDialog";
function CheckStatus() {
    const [query, setSearch] = useState("");
    const [filterState, setFilterState] = useState("Todos");
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
    const [modalData, setModalData] = useState({ name: "", plate: "", state: "", ubication: "", text: "" });

    const filteredVehicles = vehicles
        .filter((v) => filterState === "Todos" || v.state === filterState)
        .filter((v) => v.name.toLowerCase().includes(query.toLowerCase()) || v.plate.toLowerCase().includes(query.toLowerCase()));

    const handleFileChange = (file) => {
        setVehicleFile(file);
    };

    const openEditModal = (vehicle) => {
        setSelectedVehicle(vehicle);
        setModalData({
            name: vehicle.name,
            plate: vehicle.plate,
            state: vehicle.state,
            ubication: vehicle.ubication,
            text: vehicle.text,
        });
        setVehicleFile(vehicle.img || null);
    };

    const closeModal = () => {
        setSelectedVehicle(null);
        setModalData({ name: "", plate: "", state: "", ubication: "", text: "" });
        setVehicleFile(null);
    };

    const handleChange = (key, value) => {
        setModalData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        if (!selectedVehicle) return;

        const newImage =
            vehicleFile instanceof File
                ? URL.createObjectURL(vehicleFile)
                : vehicleFile ?? selectedVehicle.img;

        setVehicles((prev) =>
            prev.map((vehicle) =>
                vehicle.plate === selectedVehicle.plate
                    ? { ...vehicle, ...modalData, img: newImage }
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
                                        value={modalData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Placa
                                    <input
                                        className={style["modal-input"]}
                                        value={modalData.plate}
                                        onChange={(e) => handleChange("plate", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Estado
                                    <select
                                        value={modalData.state}
                                        onChange={(e) => handleChange("state", e.target.value)}
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
                                        value={modalData.ubication}
                                        onChange={(e) => handleChange("ubication", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Descripción
                                    <textarea
                                        className={style["modal-textarea"]}
                                        value={modalData.text}
                                        onChange={(e) => handleChange("text", e.target.value)}
                                    />
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
                            <button type="button" className={style["modal-submitButton"]} onClick={handleSave}>
                                Guardar cambios
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
