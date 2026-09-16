import { httpClient } from '../../../../shared/api/httpClient';
import { toCreateMaintenancePayload } from './maintenanceMapper';

const RESOURCE = '/maintenances';

export const maintenanceService = {
    getAll: () => httpClient.get(RESOURCE),
    create: (formData) => httpClient.post(RESOURCE, toCreateMaintenancePayload(formData)),
};