import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Dashboard/DashboardPage";
import AuthPage from "../Auth/AuthPage";
import {
  setCoursesAtom,
  setEquipmentAtom,
  setSelectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import { useAtom } from "jotai";
import SideBar from "../../components/common/SideBar/SideBar";
import TraineeCoursePage from "../Courses/TraineeCoursePage";
import InstrCoursePage from "../Courses/InstrCoursePage";
import EquipmentPage from "../Equipment/EquipmentPage";
import EquipmentUnitPage from "../EquipmentUnit/EquipmentUnitPage";
import {
  getAllCoursesService,
  getTraineeCourseService,
} from "../../utilities/courses/courses-service";
import { getAllEquipmentService } from "../../utilities/equipment/equipment-service";
import { useEffect } from "react";
import _ from "lodash";

const App = () => {
  const [user] = useAtom(userAtom);
  const [, setEquipment] = useAtom(setEquipmentAtom);
  const [, setSelectedCourse] = useAtom(setSelectedCourseAtom);
  const [, setCourses] = useAtom(setCoursesAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!_.isEmpty(user)) {
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, setCourses, setSelectedCourse, setEquipment]);

  return (
    <div className="flex min-h-screen min-w-screen bg-[#202029]">
      {user && <SideBar />}
      <div className="flex-grow flex flex-col">
        <Routes>
          {user ? (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path={`/dashboard/${
                  user.role === "trainee" ? "trainee" : "instructor"
                }`}
                element={
                  user.role === "trainee" ? (
                    <TraineeCoursePage />
                  ) : user.role === "instructor" || user.role === "admin" ? (
                    <InstrCoursePage />
                  ) : null
                }
              />
              <Route path="/dashboard/equipment" element={<EquipmentPage />} />
              <Route
                path="/dashboard/equipment/:category"
                element={<EquipmentUnitPage />}
              />
            </>
          ) : (
            <Route path="/*" element={<AuthPage />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
