import { fetchRequest } from "../common/common-service";

const BASE_URL = "/api/courses";

export const getAllCoursesAPI = () => {
  return fetchRequest(BASE_URL);
};

export const getTraineeCourseAPI = () => {
  return fetchRequest(`${BASE_URL}/trainee`);
};

export const assignICAPI = (traineeID, courseID, IC) => {
  return fetchRequest(`${BASE_URL}/${courseID}/editIC`, "PUT", {
    traineeID: traineeID,
    IC,
  });
};

export const addInstructorAPI = (courseID, instrID) => {
  return fetchRequest(`${BASE_URL}/${courseID}/${instrID}/add`, "PATCH");
};

export const deleteInstructorAPI = (courseID, instrID) => {
  return fetchRequest(`${BASE_URL}/${courseID}/${instrID}/delete`, "DELETE");
};
