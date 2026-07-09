import { useTranslation } from "react-i18next";
import style from "./FiltrerStatus.module.css"
import { ImSearch } from "react-icons/im";
function FiltrerStatus({ query, setSearch, filterState, setFilterState }) {
    const { t } = useTranslation();
    const states = [
        { value: "all", label: t("FiltrerStatus.all") },
        { value: "available", label: t("CheckStatus.modal.stateOptions.available") },
        { value: "maintenance", label: t("CheckStatus.modal.stateOptions.maintenance") },
        { value: "inUse", label: t("CheckStatus.modal.stateOptions.inUse") },
        { value: "reserved", label: t("CheckStatus.modal.stateOptions.reserved") },
    ];

    return (
        <>
            <div className={style["container-filter"]}>
                <input value={query} onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("FiltrerStatus.placeholder")} />
                <ImSearch className={style["icon-search"]} />
            </div>
            <div className={style["container-chips"]}>
                {states.map((state) => (
                    <button key={state.value} onClick={() => setFilterState(state.value)} className={filterState === state.value ? style["chip-active"] : style["chip"]}>    {/* // Cambia el estilo del botón según si está activo o no  */}
                        {state.label}
                    </button>
                ))}
            </div>
        </>

    )
}
export default FiltrerStatus;