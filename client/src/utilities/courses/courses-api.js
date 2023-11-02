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
  return fetchRequest(`${BASE_URL}/${courseID}/instrs/${instrID}/add`, "PATCH");
};

export const deleteInstructorAPI = (courseID, instrID) => {
  return fetchRequest(
    `${BASE_URL}/${courseID}/instrs/${instrID}/delete`,
    "DELETE"
  );
};

export const deleteTraineeAPI = (courseID, traineeID) => {
  return fetchRequest(
    `${BASE_URL}/${courseID}/trainees/${traineeID}/delete`,
    "DELETE"
  );
};

export const deleteCourseAPI = (courseID) => {
  return fetchRequest(`${BASE_URL}/${courseID}/delete`, "DELETE");
};
