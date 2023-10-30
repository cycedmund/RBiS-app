import { useAtom } from "jotai";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import InstructorDashboard from "../../components/dashboard/InstructorDashboard/InstructorDashboard";
import TraineeDashboard from "../../components/dashboard/TraineeDashboard/TraineeDashboard";
import {
  setCoursesAtom,
  setEquipmentAtom,
  setSelectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import {
  getAllCoursesService,
  getTraineeCourseService,
} from "../../utilities/courses/courses-service";
import { getAllEquipmentService } from "../../utilities/equipment/equipment-service";
import EquipmentDashboardPage from "../Equipment/EquipmentDashboardPage";
import EquipmentUnitDashboard from "../EquipmentUnit/EquipmentUnitDashboard";

const DashboardPage = () => {
  const [user] = useAtom(userAtom);
  const [, setEquipment] = useAtom(setEquipmentAtom);
  const [, setSelectedCourse] = useAtom(setSelectedCourseAtom);
  const [, setCourses] = useAtom(setCoursesAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === "instructor" || user.role === "admin") {
          const allCourses = await getAllCoursesService();
          setCourses(allCourses.courses);

          if (allCourses.courses.length > 0) {
            setSelectedCourse(allCourses.courses[0]);
          }
        } else if (user.role === "trainee") {
          const traineeCourse = await getTraineeCourseService();
          setSelectedCourse(traineeCourse.courses[0]);
        }

        const allEquipment = await getAllEquipmentService();
        setEquipment(allEquipment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, setCourses, setSelectedCourse, setEquipment]);

  return (
    <div>
      {user.role === "trainee" && (
        <Routes>
          <Route path="/trainee" element={<TraineeDashboard />} />
          <Route path="/equipment" element={<EquipmentDashboardPage />} />
          <Route
            path="/equipment/:category"
            element={<EquipmentUnitDashboard />}
          />
        </Routes>
      )}
      {(user.role === "admin" || user.role === "instructor") && (
        <Routes>
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/equipment" element={<EquipmentDashboardPage />} />
          <Route
            path="/equipment/:category"
            element={<EquipmentUnitDashboard />}
          />
        </Routes>
      )}
    </div>
  );
};

export default DashboardPage;

// useEffect(() => {
//   const fetchTraineeCourse = async () => {
//     const traineeCourse = await getTraineeCourseService();
//     // console.log("course", traineeCourse);
//     setSelectedCourse(traineeCourse.courses[0]);
//   };

//   fetchTraineeCourse();
// }, [setSelectedCourse]);

// useEffect(() => {
//   const fetchAllCourses = async () => {
//     const allCourses = await getAllCoursesService();
//     setCourses(allCourses.courses);

//     if (allCourses.courses.length > 0) {
//       setSelectedCourse(allCourses.courses[0]);
//     }
//   };

//   fetchAllCourses();
// }, [setCourses, setSelectedCourse]);

// useEffect(() => {
//   const fetchAllEquipment = async () => {
//     const allEquipment = await getAllEquipmentService();
//     console.log(allEquipment);
//     setEquipment(allEquipment);
//   };
//   fetchAllEquipment();
// }, [setEquipment]);
