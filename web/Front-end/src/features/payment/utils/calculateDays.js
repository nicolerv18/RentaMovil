// @ts-nocheck
export function calculateDays(startDate, endDate) {
    if (!startDate || !endDate) {
        return 0;
    }

    // 🟢 LA SOLUCIÓN: Convertimos los parámetros a objetos Date reales por si vienen como Strings
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);

    // Validamos que sean fechas válidas para evitar errores de NaN
    if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) {
        return 0;
    }

    const start = new Date(
        startObj.getFullYear(),
        startObj.getMonth(),
        startObj.getDate()
    );

    const end = new Date(
        endObj.getFullYear(),
        endObj.getMonth(),
        endObj.getDate()
    );

    const difference = end.getTime() - start.getTime();
    
    const days = difference / (1000 * 60 * 60 * 24);

    return Math.max(days, 1);
}
