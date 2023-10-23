import { fetchRequest } from "../common/common-service";

const BASE_URL = "/api/equipment";

export const getAllEquipmentAPI = () => {
  return fetchRequest(BASE_URL);
};

export const updateEquipmentAPI = (equipmentID, data) => {
  return fetchRequest(`${BASE_URL}/${equipmentID}/update`, "PUT", data);
};

export const editEquipmentLocationAPI = (equipmentID, location) => {
  return fetchRequest(`${BASE_URL}/${equipmentID}/location/edit`, "PATCH", {
    status: location,
  });
};

export const editEquipmentDescAPI = (equipmentID, description) => {
  return fetchRequest(`${BASE_URL}/${equipmentID}/description/edit`, "PATCH", {
    description: description,
  });
};
