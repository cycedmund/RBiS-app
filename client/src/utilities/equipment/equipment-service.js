import {
  addEquipmentAPI,
  deleteEquipmentAPI,
  editEquipmentDescAPI,
  editEquipmentLocationAPI,
  getAllEquipmentAPI,
  updateEquipmentAPI,
} from "./equipment-api";

export const getAllEquipmentService = async () => {
  const equipment = await getAllEquipmentAPI();
  return equipment.data;
};

export const updateEquipmentService = async (equipmentUnitID, data) => {
  const update = await updateEquipmentAPI(equipmentUnitID, data);
  return update;
};

export const editEquipmentLocationService = async (
  equipmentUnitID,
  location
) => {
  const update = await editEquipmentLocationAPI(equipmentUnitID, location);
  return update;
};

export const editEquipmentDescService = async (
  equipmentUnitID,
  description
) => {
  const update = await editEquipmentDescAPI(equipmentUnitID, description);
  return update;
};

export const deleteEquipmentService = async (equipmentID) => {
  const count = await deleteEquipmentAPI(equipmentID);
  return count.data;
};

export const addEquipmentService = async (data) => {
  const newEquipment = await addEquipmentAPI(data);
  return newEquipment;
};
