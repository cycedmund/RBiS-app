import { useAtom } from "jotai";
import _ from "lodash";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { userAtom } from "../../../utilities/atom-jotai/atom";
import {
  addInstructorService,
  assignICService,
  deleteInstructorService,
  getAllCoursesService,
} from "../../../utilities/courses/courses-service";
import AddRemoveInstructor from "../../common/InstrDashboardComponents/AddRemoveInstructor";
import Loading from "../../common/Loading/Loading";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardTable from "../DashboardTable/DashboardTable";

const InstructorDashboard = () => {
  const [user] = useAtom(userAtom);
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

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }

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
        await Swal.fire({
          title:
            IC === "courseIC"
              ? `You have appointed ${updatedCourse.courseIC.formattedFullName} as the IC`
              : `You have appointed ${updatedCourse.weaponStoreIC.formattedFullName} as the IC`,
          icon: "success",
        });
      }
    } catch (err) {
      console.error("Error assigning IC", err);
      Swal.fire({
        title: "Error assigning IC",
        icon: "error",
      });
    }
  };

  const handleAddInstructor = async () => {
    try {
      const response = await addInstructorService(selectedCourse._id, user._id);
      console.log("response", response);
      const { status, data } = response;
      if (status === "success") {
        setCourses((prevCourses) => {
          return prevCourses.map((course) => {
            if (course._id === selectedCourse._id) {
              return data.updatedCourse;
            }
            return course;
          });
        });
        setSelectedCourse(data.updatedCourse);
        Swal.fire({
          title: "Added as Instructor",
          icon: "success",
        });
      }
    } catch (err) {
      console.error("Error adding as Instructor", err);
    }
  };

  const handleDeleteInstructor = async () => {
    try {
      const response = await deleteInstructorService(
        selectedCourse._id,
        user._id
      );
      console.log(response);
      const { status, data } = response;
      if (status === "success") {
        setCourses((prevCourses) => {
          return prevCourses.map((course) => {
            if (course._id === selectedCourse._id) {
              return data.updatedCourse;
            }
            return course;
          });
        });
        setSelectedCourse(data.updatedCourse);
        Swal.fire({
          title: "You have been removed",
          icon: "success",
        });
      }
    } catch (err) {
      console.error("Error adding as Instructor", err);
    }
  };

  return (
    <div>
      {selectedCourse && <DashboardStats selectedCourse={selectedCourse} />}
      <div className="tabs border-b-[1px] border-gray-600 mx-6 mt-3 overflow-x-auto flex whitespace-nowrap">
        {courses.length > 0 &&
          courses.map((course) => {
            const tabStyle =
              course === selectedCourse
                ? { borderBottom: "2px solid #7299f2" }
                : {};
            return (
              <div
                className={`tab ${
                  course === selectedCourse ? "tab-active" : ""
                } font-roboto font-bold text-lg`}
                style={tabStyle}
                key={course._id}
                onClick={() => handleClick(course)}
              >
                {course.course}
              </div>
            );
          })}
      </div>
      <AddRemoveInstructor
        selectedCourse={selectedCourse}
        handleAddInstructor={handleAddInstructor}
        handleDeleteInstructor={handleDeleteInstructor}
      />

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
