import {
  addInstructorAPI,
  assignICAPI,
  deleteCourseAPI,
  deleteInstructorAPI,
  deleteTraineeAPI,
  getAllCoursesAPI,
  getTraineeCourseAPI,
} from "./courses-api";

export const getAllCoursesService = async () => {
  const courses = await getAllCoursesAPI();
  return courses.data;
};

export const getTraineeCourseService = async () => {
  const course = await getTraineeCourseAPI();
  return course.data;
};

export const assignICService = async (traineeID, courseID, IC) => {
  const response = await assignICAPI(traineeID, courseID, IC);
  return response;
};

export const addInstructorService = async (courseID, instrID) => {
  const response = await addInstructorAPI(courseID, instrID);
  return response;
};

export const deleteInstructorService = async (courseID, instrID) => {
  const response = await deleteInstructorAPI(courseID, instrID);
  return response;
};

export const deleteTraineeService = async (courseID, traineeID) => {
  const response = await deleteTraineeAPI(courseID, traineeID);
  return response;
};

export const deleteCourseService = async (courseID) => {
  const response = await deleteCourseAPI(courseID);
  return response;
};
