import { fetchRequest } from "../common/common-service";

const BASE_URL = "/api/equipment";

export const getAllEquipmentAPI = () => {
  return fetchRequest(BASE_URL);
};

export const updateEquipmentAPI = (equipmentUnitID, data) => {
  return fetchRequest(`${BASE_URL}/${equipmentUnitID}/update`, "PUT", data);
};

export const editEquipmentLocationAPI = (equipmentUnitID, location) => {
  return fetchRequest(`${BASE_URL}/${equipmentUnitID}/location/edit`, "PATCH", {
    status: location,
  });
};

export const editEquipmentDescAPI = (equipmentUnitID, description) => {
  return fetchRequest(
    `${BASE_URL}/${equipmentUnitID}/description/edit`,
    "PATCH",
    {
      description: description,
    }
  );
};

export const deleteEquipmentAPI = (equipmentID) => {
  return fetchRequest(`${BASE_URL}/${equipmentID}`, "DELETE");
};

export const addEquipmentAPI = (data) => {
  return fetchRequest(`${BASE_URL}/new`, "POST", { data: data });
};
