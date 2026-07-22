import { useTranslation } from "react-i18next";
import { Pie, PieChart, Cell, Tooltip } from "recharts";// Importar los componentes necesarios de Recharts para crear el gráfico circular
import style from "../components/FleetChartMaintenance.module.css";
function FleetChartMaintenance({ records }) {
    const { t } = useTranslation();
    const stateMap = {
        pending: "Pendiente",
        inProgress: "En progreso",
        completed: "Completado",
        cancel: "Cancelado",
    };
    const COLORS = {// Definir los colores para cada estado de los vehículos
    pending: "#F59E0B",     
    inProgress: "#8B5CF6",  
    completed: "#22C55E",  
    cancel: "#EF4444", 
    }
    const desiredOrder = ["pending", "inProgress", "completed", "cancel"]
    const data = desiredOrder.map((stateKey) => ({
        name: stateKey, // El nombre del estado
        value: records.filter((v) => v.state === stateMap[stateKey]).length, // Contar la cantidad de vehículos que tienen ese estado
    }))
    console.log(data)
    const total = records.length
    return (
        <div className={style["fleet-chart-container"]}>
                 <h3>{t("History.title2")}:</h3>

            <div className={style["fleet-chart"]}>

                <PieChart width={160} height={160}>
                    <Pie data={data} cx={80} cy={80} innerRadius={45} outerRadius={70} dataKey="value">{
                        data.map((entry) => (
                            <Cell key={entry.name} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, t(`FleetChartMaintenance.${name}`)]} />
                </PieChart>
                <div className={style["fleet-chart-info"]}>
                    <div className={style["fleet-chart-total"]}>{total}</div>
                    <div className={style["fleet-chart-label"]}>{t("CartVehiculeStatus.veicle")}</div>
                </div>
            </div>
            <div className={style["fleet-chart-legend"]}>
                {data.map((entry) => {
                    const label = t(`FleetChartMaintenance.${entry.name}`);
                    return (
                        <div key={entry.name} className={style["legend-item"]}>
                            <span className={style["legend-color"]} style={{ backgroundColor: COLORS[entry.name] }} />
                            {label}: {entry.value}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FleetChartMaintenance;