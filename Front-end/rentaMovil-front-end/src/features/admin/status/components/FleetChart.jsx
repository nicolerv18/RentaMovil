import { Pie, PieChart, Cell, Tooltip } from "recharts";// Importar los componentes necesarios de Recharts para crear el gráfico circular
import style from "../components/FleetChart.module.css";
function FleetChart({ vehicles }) {
    const COLORS = {// Definir los colores para cada estado de los vehículos
        "Disponible": "#8cff00",
        "En mantenimiento": "#afafaf",
        "En uso": '#2853ff',
        "Reservado": "#ba1717",
    }
    const desiredOrder = ["Disponible", "En uso", "Reservado", "En mantenimiento"];
    const data = desiredOrder.map((state) => ({ // Crear un array de objetos con el nombre del estado y la cantidad de vehículos en ese estado
        name: state, // El nombre del estado
        value: vehicles.filter((v) => v.state === state).length, // Contar la cantidad de vehículos que tienen ese estado
    }))

    const total = vehicles.length
    return (
        <div className={style["fleet-chart-container"]}>
            <div className={style["fleet-chart-chart"]}>
                <PieChart width={160} height={160}>{/*crear el gráfico circular */}
                    <Pie data={data} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value"> {/* configurar el gráfico circular con los datos de estado de los vehículos */}
                        {data.map((entry) => ( // Mapear cada entrada de datos para asignar un color a cada estado */}
                            <Cell key={entry.name} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
                <div className={style["fleet-chart-info"]}>
                    <div className={style["fleet-chart-total"]}>{total}</div>
                    <div className={style["fleet-chart-label"]}>vehículos</div>
                </div>
            </div>
            <div className={style["fleet-chart-legend"]}>
                {data.map((entry) => {
                    const label = entry.name === "En mantenimiento" ? "Mantenimiento" : entry.name;
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
export default FleetChart;