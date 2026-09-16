import { httpClient } from '../../../../shared/api/httpClient';
import { toVehiclePayload } from './vehicleMapper';
const RESOURCE = '/vehicles';

export const vehicleService = {
    getAll: () => httpClient.get(RESOURCE),
    getById: (id) => httpClient.get(`${RESOURCE}/${id}`),
    create: (vehicleData) => httpClient.post(RESOURCE, toVehiclePayload(vehicleData)),
    update: (id, vehicleData) => httpClient.put(`${RESOURCE}/${id}`, toVehiclePayload(vehicleData)),
    updateStatus: (id, status) => httpClient.patch(`${RESOURCE}/${id}`, { status }),
    remove: (id) => httpClient.delete(`${RESOURCE}/${id}`),
};