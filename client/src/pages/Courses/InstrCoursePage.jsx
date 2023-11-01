import { useAtom } from "jotai";
import _ from "lodash";
import Swal from "sweetalert2";
import {
  coursesAtom,
  selectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import { errorSwal } from "../../utilities/swal/errorSwal";
import {
  addInstructorService,
  assignICService,
  deleteInstructorService,
} from "../../utilities/courses/courses-service";
import { swalSettings } from "../../utilities/swal/swalSettings";
import AddRemoveInstructor from "../../components/common/InstrDashboardComponents/AddRemoveInstructor";
import Loading from "../../components/common/Loading/Loading";
import CourseStats from "../../components/courses/CourseStats/CourseStats";
import CourseTable from "../../components/courses/CourseTable/CourseTable";

const InstrCoursePage = () => {
  const [user] = useAtom(userAtom);
  const [courses, setCourses] = useAtom(coursesAtom);
  const [selectedCourse, setSelectedCourse] = useAtom(selectedCourseAtom);

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }

  const handleClick = (course) => {
    setSelectedCourse(course);
  };

  const handleAssignIC = async (traineeID, courseID, IC, name) => {
    try {
      const result = await Swal.fire({
        ...swalSettings("Are you certain?", "question"),
        html: `Appoint <span class="ICname">OCT ${name}</span> as the IC?`,
        showCancelButton: true,
        confirmButtonText: "Yes, appoint as IC",
        cancelButtonText: "No, I changed my mind",
      });
      if (result.isConfirmed) {
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
          Swal.fire({
            ...swalSettings("Successfully Appointed", "success"),
            html: `
            You've appointed 
              <span class="ICname">${
                IC === "courseIC"
                  ? updatedCourse.courseIC.rank
                  : updatedCourse.weaponStoreIC.rank
              }</span>
              <span class="ICname">${
                IC === "courseIC"
                  ? updatedCourse.courseIC.formattedFullName
                  : updatedCourse.weaponStoreIC.formattedFullName
              }</span>
               as the IC`,
          });
        }
      }
    } catch (err) {
      errorSwal(err);
    }
  };

  const handleAddInstructor = async () => {
    try {
      const result = await Swal.fire({
        ...swalSettings("Are you ready to instruct destruct?", "question"),
        showCancelButton: true,
        confirmButtonText: "Yes, I am ready",
        cancelButtonText: "No, I'm not ready",
      });
      if (result.isConfirmed) {
        const response = await addInstructorService(
          selectedCourse._id,
          user._id
        );
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
          Swal.fire(
            swalSettings(`Added to ${data.updatedCourse.course}`, "success")
          );
        }
      }
    } catch (err) {
      errorSwal(err);
    }
  };

  const handleDeleteInstructor = async () => {
    try {
      const result = await Swal.fire({
        ...swalSettings("Huh leaving so soon?", "question"),
        showCancelButton: true,
        confirmButtonText: "Yes, got to go",
        cancelButtonText: "No, I'm messing around",
      });
      if (result.isConfirmed) {
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
          Swal.fire(
            swalSettings(`Removed from ${data.updatedCourse.course}`, "success")
          );
        }
      }
    } catch (err) {
      errorSwal(err);
    }
  };

  return (
    <div>
      {selectedCourse && <CourseStats selectedCourse={selectedCourse} />}
      <div className="tabs border-b-[1px] border-gray-600 mx-6 mt-3 overflow-x-auto flex flex-nowrap sm:flex-wrap">
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
                } font-roboto font-normal text-xs whitespace-nowrap sm:text-lg`}
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
        <CourseTable
          key={selectedCourse._id}
          course={selectedCourse}
          handleAssignIC={handleAssignIC}
        />
      )}
    </div>
  );
};

export default InstrCoursePage;
