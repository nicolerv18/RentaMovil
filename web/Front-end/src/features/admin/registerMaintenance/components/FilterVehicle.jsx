import { useTranslation } from "react-i18next";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import style from "./FilterVehicle.module.css";

export default function FilterVehicle({ query, setSearch }) {
  const { t } = useTranslation();

  return (
    <div className={style['filter-card']}>
      <div className={style['search-box']}>
        <AiOutlineSearch className={style['search-icon']} />
        <input
          type="text"
          value={query}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("FilterVehicle.placeholder")}
          className={style['search-input']}
        />
        {query && (
          <button type="button" onClick={() => setSearch('')} className={style['clear-btn']}>
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  );
}