import { httpClient } from "../../../shared/api/httpClient";
import { toClientVehicleViewModel } from "./carsMapper";

const RESOURCE = '/vehicles'


export const carsService = {
    getAll: async () => {httpClient.get(RESOURCE)},
    getById: (id) => httpClient.get(`${RESOURCE}/${id}`),
}