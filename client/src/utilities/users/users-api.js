import { fetchRequest } from "../common/common-service";

const BASE_URL = "/api/users";

export const signUpAPI = (userData) => {
  return fetchRequest(`${BASE_URL}/signup`, "POST", userData);
};

export const loginAPI = (userData) => {
  return fetchRequest(`${BASE_URL}/login`, "POST", userData);
};

export const updateTraineeStatusAPI = (traineeID, body) => {
  return fetchRequest(`${BASE_URL}/${traineeID}/update`, "POST", body);
};
