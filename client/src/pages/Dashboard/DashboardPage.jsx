import { useAtom } from "jotai";
import {
  coursesAtom,
  selectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import DashboardCourseStats from "../../components/dashboard/DashboardCourseStats/DashboardCourseStats";
import DashboardEqptStats from "../../components/dashboard/DashboardEqptStats/DashboardEqptStats";
import { format } from "date-fns";

const DashboardPage = () => {
  const [user] = useAtom(userAtom);
  const isTrainee = user.role === "trainee";
  const [courses] = useAtom(coursesAtom);
  const [selectedCourse] = useAtom(selectedCourseAtom);
  const today = new Date();
  const formattedDate = format(today, "dd MMM yyyy (EEEE)");

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl flex lg:justify-between lg:items-center text-[#e9e9ea] flex-col lg:flex-row">
        Dashboard
        <span className="md:text-xl text-lg text-[#96B6C5] mt-2 md:mt-0">
          {formattedDate}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-4 px-4 py-2 md:p-8">
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
