/**
 * Retorna los límites de años permitidos para un vehículo.
 * @param {number} yearsAhead - Años hacia adelante permitidos para modelos futuros (por defecto 1).
 * @returns {{ minYear: number, maxYear: number, currentYear: number }}
 */
export const getValidVehicleYearRange = (yearsAhead = 1) => {
    const currentYear = new Date().getFullYear();
    return {
        minYear: 1900,
        maxYear: currentYear + yearsAhead,
        currentYear
    };
};

/**
 * Valida si un año ingresado está dentro del rango permitido.
 * @param {number|string} year - Año a evaluar.
 * @param {number} yearsAhead - Años futuros permitidos.
 * @returns {boolean|string} true si es válido, o un código de error.
 */
export const validateVehicleYear = (year, yearsAhead = 1) => {
    const numericYear = Number(year);
    const { minYear, maxYear } = getValidVehicleYearRange(yearsAhead);

    if (isNaN(numericYear)) return 'INVALID_NUMBER';
    if (numericYear < minYear) return 'YEAR_TOO_LOW';
    if (numericYear > maxYear) return 'YEAR_TOO_HIGH';

    return true; // Es válido
};