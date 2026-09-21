import { httpClient } from "../../../../shared/api/httpClient";
import { toUpdateStatusPayload, toStatusViewModel} from './statusMapper'

const RESOURCE = '/vehicles'

export const statusService = {
    getAll: () => httpClient.get(RESOURCE),
    getById: (id) => httpClient.get(`${RESOURCE}/${id}`),
    update: (id, formData) => httpClient.patch(`${RESOURCE}/${id}`, toUpdateStatusPayload(formData)),
    remove: (id) => httpClient.delete(`${RESOURCE}/${id}`),
}

