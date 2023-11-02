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
  deleteCourseService,
  deleteInstructorService,
  deleteTraineeService,
} from "../../utilities/courses/courses-service";
import { swalSettings } from "../../utilities/swal/swalSettings";
import AddRemoveInstructor from "../../components/common/InstrDashboardComponents/AddRemoveInstructor";
import Loading from "../../components/common/Loading/Loading";
import CourseStats from "../../components/courses/CourseStats/CourseStats";
import CourseTable from "../../components/courses/CourseTable/CourseTable";
import DeleteCourseButton from "../../components/common/InstrDashboardComponents/DeleteCourseButton";

const InstrCoursePage = () => {
  const [user] = useAtom(userAtom);
  const [courses, setCourses] = useAtom(coursesAtom);
  const [selectedCourse, setSelectedCourse] = useAtom(selectedCourseAtom);

  if (_.isEmpty(selectedCourse) || courses.length === 0) {
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
        cancelButtonText: "Disregard",
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
            ...swalSettings("Appointed!", "success"),
            html: `
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
               has got a point 🤪`,
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
        cancelButtonText: "Not ready",
      });
      if (result.isConfirmed) {
        const response = await addInstructorService(
          selectedCourse._id,
          user._id
        );
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
            swalSettings(
              `Added to <br /> ${data.updatedCourse.course}`,
              "success"
            )
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
        ...swalSettings("Leaving so soon?", "question"),
        showCancelButton: true,
        confirmButtonText: "Yes, got to go",
        cancelButtonText: "Disregard",
      });
      if (result.isConfirmed) {
        const response = await deleteInstructorService(
          selectedCourse._id,
          user._id
        );
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
            swalSettings(
              `Removed from <br /> ${data.updatedCourse.course}`,
              "success"
            )
          );
        }
      }
    } catch (err) {
      errorSwal(err);
    }
  };

  const handleDeleteTrainee = async (traineeID, traineeName) => {
    try {
      const isCourseIC = selectedCourse.courseIC._id === traineeID;
      const isWeaponStoreIC = selectedCourse.weaponStoreIC._id === traineeID;

      if (isCourseIC || isWeaponStoreIC) {
        Swal.fire({
          ...swalSettings("Appointed IC", "info"),
          html: `<span class="ICname">OCT ${traineeName}</span> is currently assigned as ${
            isCourseIC ? "Course IC" : "Weapon Store IC"
          }. Please appoint a new IC before deleting.`,
          confirmButtonText: "Go change",
        });
      } else {
        const result = await Swal.fire({
          ...swalSettings("Are you sure?", "warning"),
          text: `OCT ${traineeName}'s account will also be deleted 😱`,
          showCancelButton: true,
          confirmButtonText: "Yes, please",
          cancelButtonText: "Disregard",
        });
        if (result.isConfirmed) {
          const response = await deleteTraineeService(
            selectedCourse._id,
            traineeID
          );
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
              swalSettings(
                `Removed from <br /> ${data.updatedCourse.course}`,
                "success"
              )
            );
          }
        }
      }
    } catch (err) {
      errorSwal(err);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      const result = await Swal.fire({
        ...swalSettings("Are you sure?", "warning"),
        text: "All trainees' account will be deleted",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Disregard",
      });
      if (result.isConfirmed) {
        const response = await deleteCourseService(selectedCourse._id);
        const { status } = response;
        if (status === "success") {
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== selectedCourse._id)
          );

          setSelectedCourse(() => {
            const newSelectedCourse = courses.find(
              (course) => course._id !== selectedCourse._id
            );

            return newSelectedCourse || null;
          });
          Swal.fire(swalSettings(`Course Deleted`, "success"));
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
      <div className="flex items-center">
        <AddRemoveInstructor
          selectedCourse={selectedCourse}
          handleAddInstructor={handleAddInstructor}
          handleDeleteInstructor={handleDeleteInstructor}
        />
        {selectedCourse.instructors.some((instr) => instr._id === user._id) && (
          <DeleteCourseButton
            selectedCourse={selectedCourse}
            handleDeleteCourse={handleDeleteCourse}
          />
        )}
      </div>

      {selectedCourse && (
        <CourseTable
          key={selectedCourse._id}
          course={selectedCourse}
          handleAssignIC={handleAssignIC}
          handleDeleteTrainee={handleDeleteTrainee}
        />
      )}
    </div>
  );
};

export default InstrCoursePage;
