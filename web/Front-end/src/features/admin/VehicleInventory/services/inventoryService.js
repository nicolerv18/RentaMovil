import { httpClient } from "../../../../shared/api/httpClient";
import { toInventoryViewModel  } from "./inventoryMapper";
const RESOURCE = "/vehicles";

export const  inventoryService = {
    getAll: () => httpClient.get(RESOURCE),
    getById: (id) => httpClient.get(`${RESOURCE}/${id}`),
}