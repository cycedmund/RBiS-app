import {
  assignICAPI,
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

export const assignICService = async (traineeID, courseID) => {
  const response = await assignICAPI(traineeID, courseID);
  return response;
};
