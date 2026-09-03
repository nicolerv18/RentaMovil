import { useTranslation } from "react-i18next";
import { Pie, PieChart, Cell, Tooltip } from "recharts";// Importar los componentes necesarios de Recharts para crear el gráfico circular
import style from "../components/FleetChart.module.css";
function FleetChart({ vehicles }) {
    const { t } = useTranslation();
    const stateMap = {
        available: "Disponible",
        maintenance: "En mantenimiento",
        inUse: "En uso",
        reserved: "Reservado",
    };
    const COLORS = {// Definir los colores para cada estado de los vehículos
    available: "#22C55E",    
    inUse: "#2563EB",         
    maintenance: "#F59E0B",   
    reserved: "#8B5CF6",     
};

    const desiredOrder = ["available", "inUse", "reserved", "maintenance"];
    const data = desiredOrder.map((stateKey) => ({ // Crear un array de objetos con el nombre del estado y la cantidad de vehículos en ese estado
        name: stateKey, // El nombre del estado
        value: vehicles.filter((v) => v.status === stateMap[stateKey]).length, // Contar la cantidad de vehículos que tienen ese estado
    }))

    const total = vehicles.length
    return (
        <div className={style["fleet-chart-container"]}>
                 <h3>{t("History.availableVehicles")}:</h3>

            <div className={style["fleet-chart-position"]}>
            <div className={style["fleet-chart-chart"]}>
                <PieChart width={160} height={160}>{/*crear el gráfico circular */}
                    <Pie data={data} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value"> {/* configurar el gráfico circular con los datos de estado de los vehículos */}
                        {data.map((entry) => ( // Mapear cada entrada de datos para asignar un color a cada estado */}
                            <Cell key={entry.name} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, t(`CheckStatus.modal.stateOptions.${name}`)]} />
                </PieChart>
                <div className={style["fleet-chart-info"]}>
                    <div className={style["fleet-chart-total"]}>{total}</div>
                    <div className={style["fleet-chart-label"]}>{t("CartVehiculeStatus.veicle")}</div>
                </div>
            </div>
            <div className={style["fleet-chart-legend"]}>
                {data.map((entry) => {
                    const label = t(`CheckStatus.modal.stateOptions.${entry.name}`);
                    return (
                        <div key={entry.name} className={style["legend-item"]}>
                            <span className={style["legend-color"]} style={{ backgroundColor: COLORS[entry.name] }} />
                            {label}: {entry.value} 
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}
export default FleetChart;