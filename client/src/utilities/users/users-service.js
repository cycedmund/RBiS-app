import { getToken } from "../common/common-service";
import { signUpAPI, loginAPI, updateTraineeStatusAPI } from "./users-api";

export const getUser = () => {
  const token = getToken();
  if (token === null) return null;
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const { user } = decoded;
  return user;
};

export const signUpService = async (userData) => {
  const data = await signUpAPI(userData);
  localStorage.setItem("token", data.data.token);
  return getUser();
};

export const loginService = async (userData) => {
  const data = await loginAPI(userData);
  localStorage.setItem("token", data.data.token);
  return getUser();
};

export const updateTraineeStatusService = async (traineeID, body) => {
  const response = await updateTraineeStatusAPI(traineeID, body);
  return response;
};

export const logOutUserService = () => {
  localStorage.removeItem("token");
};
