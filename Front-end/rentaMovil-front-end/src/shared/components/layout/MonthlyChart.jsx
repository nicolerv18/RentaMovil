import { useState} from "react";
import { useTranslation } from "react-i18next";
function SearchBar({ query, setSearch, filterState, setFilterState }) {
    const { t } = useTranslation();
    // el useRef es una una funcion de react que nos permite crear una referencia mutable a un elemento del DOM o a un valor que persiste entre renderizados. En este caso, se está utilizando para crear una referencia al botón de cierre del filtro.
    const filterClose = useRef(null);
    
    useEffect(() => {
        const handleClick = (event) => {
            if (filterClose.current && !filterClose.current.contains(event.target)){
                setFilterState(null);
            }
        }
        document.addEventListener("mousedown",handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, []);

    // guarda que el filtro esa abierto o cerrado
    const [filterOpen, setFilterOpen]
}