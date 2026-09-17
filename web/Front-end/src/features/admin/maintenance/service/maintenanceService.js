import { httpClient } from '../../../../shared/api/httpClient';
import { toCreateMaintenancePayload, toUpdateMaintenancePayload } from './maintenanceMapper';
const RESOURCE = '/maintenances';

export const maintenanceService = {
    getAll: () => httpClient.get(RESOURCE),
    create: (formData) => httpClient.post(RESOURCE, toCreateMaintenancePayload(formData)),
    update: (id, formData) => httpClient.patch(`${RESOURCE}/${id}`, toUpdateMaintenancePayload(formData)),
    remove: (id) => httpClient.delete(`${RESOURCE}/${id}`),
};