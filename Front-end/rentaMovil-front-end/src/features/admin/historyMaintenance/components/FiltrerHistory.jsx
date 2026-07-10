import { useState } from "react";
import style from "./FiltrerHistory.module.css"
import { ImSearch } from "react-icons/im";

import { useTranslation } from "react-i18next";
function FiltrerHistory({ query, setSearch, filterState, setFilterState }) {
    const {t} = useTranslation();
    const states = [t("FiltrerHistory.all"), t("FiltrerHistory.pending"), t("FiltrerHistory.inProgress"), t("FiltrerHistory.completed"), t("FiltrerHistory.cancel")];// Array de estados para el filtro, se puede modificar según los estados reales de los vehículos

    return (
        <>
            <div className={style["container-filter"]}>
                <input value={query} onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("FiltrerHistory.placeholder")} />
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