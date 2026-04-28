import Navbar from "../../../../shared/components/layout/Navbar";
import Footer from '../../../../shared/components/layout/Footer';
import img from "../../../../assets/carts/viejo.JPG"
import CartVehiculeStatus from "../components/CartVehiculeStatus";
import FiltrerStatus from "../components/FiltrerStatus";
import { useState } from "react"
import FleetChart from "../components/FleetChart";
import Animation from "../../../../shared/components/layout/Animation";
import style from "../pages/CheckStatus.module.css";
function checkStatus() {

    const [query, setSearch] = useState("");// Estado para almacenar el valor del input de búsqueda
    const [filterState, setFilterState] = useState("Todos");// Estado para almacenar el estado de filtro seleccionado
    const vehciles = [
        { name: "Vehículo 1", text: "Esste vehiculo tiene contrato cossssssssssssssssssssssssssssssssssssssssssssssssssssn la naturaleza", state: "Disponible", plate: "ABC123", img: img, ubication: "Ubicación 1" },
        { name: "Vehículo 2", text: "Presenta incomvenientes en la trasmicion, en el motor, en la culata, en la bomba de gasolina, en el tiempo, en la supencion, en la  ", state: "En mantenimiento", plate: "DEF456", img: img, ubication: "Ubicación 2" },
        { name: "Vehículo 3", text: "Esste vehiculo tiene contrato con la. y muchod ptoblemas mas naturaleza", state: "En uso", plate: "GHI789", img: img, ubication: "Ubicación 3" },
        { name: "Vehículo 4", text: "Esste vehiculo como por ejemplotiene contrato con la naturaleza", state: "En uso", plate: "JKL012", img: img, ubication: "Ubicación 4" },
    ]// Array de vehículos de ejemplo mientras se implementa la lógica de búsqueda y bakend

    const filtrers = vehciles
        .filter((v) => filterState === "Todos" || v.state === filterState) // Filtrar los vehículos según el estado seleccionado en el filtro
        .filter((v) => v.name.toLowerCase().includes(query.toLowerCase()) || v.plate.toLowerCase().includes(query.toLowerCase()))// Filtrar los vehículos según el query de búsqueda



    return (
        <>
            <Navbar />
            <div className={style["card-check"]}>
                <div className={style["card-container-left"]}>
                    <div className={style["card-container-setSearch"]}>
                        <FiltrerStatus query={query} setSearch={setSearch} filterState={filterState} setFilterState={setFilterState} />
                    </div>
                    <div className={style["card-container-fleetc"]}>
                        <FleetChart vehicles={vehciles} />
                    </div>
                </div>
                <div className={style["card-container-right"]}>
                    <div className={style["card-container-status"]}>
                        {filtrers.map((v) => (
                            <CartVehiculeStatus key={v.plate} {...v} /> /* Renderizar el componente CartVehiculeStatus para cada vehículo filtrado */
                        ))}
                    </div>
                </div>

                <Animation />
            </div>
            <Footer />
        </>
    )
}

export default checkStatus;