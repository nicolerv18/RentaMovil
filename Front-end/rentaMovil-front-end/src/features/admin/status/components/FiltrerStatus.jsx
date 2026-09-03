import { useTranslation } from "react-i18next";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import style from "./FiltrerStatus.module.css"
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
            <div className={style['filter-card']}>
                <div className={style['search-box']}>
                    <AiOutlineSearch className={style['search-icon']} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("FiltrerStatus.placeholder")}
                        className={style['search-input']}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            className={style['clear-btn']}
                        >
                            <AiOutlineClose />
                        </button>
                    )}
                </div>

                {/* Chips de Filtro */}
                <div className={style['chips-container']}>
                    {states.map((cat) => {
                        const isActive = filterState === cat.value;
                        return (
                            <button
                                key={cat.value}
                                type="button"
                                onClick={() => setFilterState(cat.value)}
                                className={`${style['chip']} ${isActive ? style['chip--active'] : ''}`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

        </>

    )
}
export default FiltrerStatus;

