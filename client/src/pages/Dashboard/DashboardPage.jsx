import { useAtom } from "jotai";
import {
  coursesAtom,
  selectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import DashboardCourseStats from "../../components/dashboard/DashboardCourseStats/DashboardCourseStats";
import DashboardEqptStats from "../../components/dashboard/DashboardEqptStats/DashboardEqptStats";

const DashboardPage = () => {
  const [user] = useAtom(userAtom);
  const isTrainee = user.role === "trainee";
  const [courses] = useAtom(coursesAtom);
  const [selectedCourse] = useAtom(selectedCourseAtom);

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl flex justify-between text-[#e9e9ea]">
        Dashboard
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-4 p-8">
        <div className="lg:col-span-2 flex flex-col gap-2">
          {isTrainee
            ? selectedCourse && (
                <DashboardCourseStats
                  course={selectedCourse}
                  key={selectedCourse._id}
                />
              )
            : courses.map((course) => (
                <DashboardCourseStats course={course} key={course._id} />
              ))}
        </div>
        <div className="lg:col-span-2 flex flex-col gap-2">
          <DashboardEqptStats />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
