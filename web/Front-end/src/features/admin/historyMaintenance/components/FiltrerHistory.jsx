import { useState } from "react";
import style from "./FiltrerHistory.module.css"
import { ImSearch } from "react-icons/im";
function FiltrerHistory({ query, setSearch, filterState, setFilterState }) {
    const states = ["Todos", "Pendiente", "En progreso", "Completado", "Cancelado"];// Array de estados para el filtro, se puede modificar según los estados reales de los vehículos

    return (
        <>
            <div className={style["container-filter"]}>
                <input value={query} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por placa, marca o modelo" />
                <ImSearch className={style["icon-search"]} />
            </div>
            <div className={style["container-chips"]}>
                {states.map((state) => (
                    <button key={state} onClick={() => setFilterState(state)} className={filterState === state ? style["chip-active"] : style["chip"]}>    {/* // Cambia el estilo del botón según si está activo o no  */}
                        {state}
                    </button>
                ))}
            </div>
        </>

    )
}
export default FiltrerHistory;