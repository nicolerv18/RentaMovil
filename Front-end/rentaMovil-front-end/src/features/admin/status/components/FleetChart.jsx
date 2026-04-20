import { Pie, PieChart, Cell, Tooltip} from "recharts";// Importar los componentes necesarios de Recharts para crear el gráfico circular

function FleetChart({vehicles}){ 
    const COLORS = {// Definir los colores para cada estado de los vehículos
        "Disponible": "#639922",
        "En mantenimiento": "#888780",
        "En uso": '#2853ff',
        "Reservado": "#BA7517",
    }
    const data = Object.keys(COLORS).map((state) => ({ // Crear un array de objetos con el nombre del estado y la cantidad de vehículos en ese estado
        name: state,// El nombre del estado
        value: vehicles.filter((v) => v.state === state).length, // Contar la cantidad de vehículos que tienen ese estado
    }))

    return (
        <PieChart width={160} height={160}>{/*crear el gráfico circular */}
            <Pie data={data} cx={75} cy={75} innerRadius={50} outerRadius={75} dataKey="value"> {/* configurar el gráfico circular con los datos de estado de los vehículos */}
                {data.map((entry) => ( // Mapear cada entrada de datos para asignar un color a cada estado */}
                    <Cell key={entry.name} fill={COLORS[entry.name]} /> 
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    )
} 
export default FleetChart;