import {
  editEquipmentDescAPI,
  editEquipmentLocationAPI,
  getAllEquipmentAPI,
  updateEquipmentAPI,
} from "./equipment-api";

export const getAllEquipmentService = async () => {
  const equipment = await getAllEquipmentAPI();
  return equipment.data;
};

export const updateEquipmentService = async (equipmentID, data) => {
  const update = await updateEquipmentAPI(equipmentID, data);
  return update;
};

export const editEquipmentLocationService = async (equipmentID, location) => {
  const update = await editEquipmentLocationAPI(equipmentID, location);
  return update;
};

export const editEquipmentDescService = async (equipmentID, description) => {
  const update = await editEquipmentDescAPI(equipmentID, description);
  return update;
};
