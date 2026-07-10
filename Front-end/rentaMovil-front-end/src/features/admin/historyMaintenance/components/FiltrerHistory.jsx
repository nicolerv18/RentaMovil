import { useState } from "react";
import style from "./FiltrerHistory.module.css"
import { ImSearch } from "react-icons/im";

import { useTranslation } from "react-i18next";
function FiltrerHistory({ query, setSearch, filterState, setFilterState }) {
    const { t } = useTranslation();
    const states = [
        { key: "all", label: t("FiltrerHistory.all") },
        { key: "Pendiente", label: t("FleetChartMaintenance.pending") },
        { key: "En progreso", label: t("FleetChartMaintenance.inProgress") },
        { key: "Completado", label: t("FleetChartMaintenance.completed") },
        { key: "Cancelado", label: t("FleetChartMaintenance.cancel") },
    ];// Array de estados para el filtro, se puede modificar según los estados reales de los vehículos

    return (
        <>
            <div className={style["container-filter"]}>
                <input value={query} onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("FiltrerHistory.placeholder")} />
                <ImSearch className={style["icon-search"]} />
            </div>
            <div className={style["container-chips"]}>
                {states.map((state) => (
                    <button
                        key={state.key}
                        onClick={() => setFilterState(state.key)}
                        className={filterState === state.key
                            ? style["chip-active"]
                            : style["chip"]}
                    >
                        {state.label}
                    </button>
                ))}
            </div>
        </>

    )
}
export default FiltrerHistory;