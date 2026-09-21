export const VEHICLE_STATUS = {
    AVAILABLE: 'Disponible',
    IN_USE: 'En uso',
    RENTED: 'Reservado',
    MAINTENANCE: 'En mantenimeinto',
};

export const VEHICLE_STATUS_LABEL = {
    [VEHICLE_STATUS.AVAILABLE]: 'Disponible',
    [VEHICLE_STATUS.IN_USE]: 'En uso',
    [VEHICLE_STATUS.RENTED]: 'En uso',      
    [VEHICLE_STATUS.MAINTENANCE]: 'Mantenimiento',
};


// necesario para el sentido inverso: el <select> guarda "Disponible", pero la API espera "DISPONIBLE"
export const LABEL_TO_VEHICLE_STATUS = Object.fromEntries(
    Object.entries(VEHICLE_STATUS_LABEL).map(([code, label]) => [label, code])
);