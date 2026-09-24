import { httpClient } from "../../../../shared/api/httpClient";
import { toCreateInsurancePayload, toUpdateInsurancePayload } from "./insuranceMapper";
const RESOURCE = "/insuranceTypes"

export const insuranceService = {
    getAll: () => httpClient.get(RESOURCE),
    create: (formData) => httpClient.post(RESOURCE, toCreateInsurancePayload(formData)),
    update: (id, formData) => httpClient.patch(`${RESOURCE}/${id}`, toUpdateInsurancePayload(formData)),
    remove: (id) => httpClient.delete(`${RESOURCE}/${id}`),
};
