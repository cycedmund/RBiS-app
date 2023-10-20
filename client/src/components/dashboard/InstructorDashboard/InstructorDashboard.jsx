import { useEffect, useState } from "react";
import {
  assignICService,
  getAllCoursesService,
} from "../../../utilities/courses/courses-service";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardTable from "../DashboardTable/DashboardTable";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchAllCourses = async () => {
      const allCourses = await getAllCoursesService();
      setCourses(allCourses.courses);

      if (allCourses.courses.length > 0) {
        setSelectedCourse(allCourses.courses[0]);
      }
    };

    fetchAllCourses();
  }, []);

  const handleClick = (course) => {
    setSelectedCourse(course);
  };

  const handleAssignIC = async (traineeID, courseID, IC) => {
    try {
      const response = await assignICService(traineeID, courseID, IC);
      const { status, data } = response;
      if (status === "success") {
        const updateIC = courses.map((course) => {
          if (course._id === courseID) {
            return {
              ...data.course,
            };
          }
          return course;
        });
        setCourses(updateIC);
        const updatedCourse = updateIC.find(
          (course) => course._id === courseID
        );
        setSelectedCourse(updatedCourse);
      }
    } catch (err) {
      console.error("Error assigning IC", err);
    }
  };

  return (
    <div>
      <header>Trainees&apos; Activity</header>
      {selectedCourse && <DashboardStats selectedCourse={selectedCourse} />}
      <div className="divider divider-vertical"></div>
      <div className="tabs bg-base-100">
        {courses.length > 0 &&
          courses.map((course) => {
            return (
              <div
                className="tab tab-bordered"
                key={course._id}
                onClick={() => handleClick(course)}
              >
                {course.course}
              </div>
            );
          })}
      </div>

      {selectedCourse && (
        <DashboardTable
          key={selectedCourse._id}
          course={selectedCourse}
          handleAssignIC={handleAssignIC}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
