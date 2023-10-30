import { useAtom } from "jotai";
import { coursesAtom, equipmentAtom } from "../../utilities/atom-jotai/atom";
import DashboardCourseStats from "../../components/dashboard/DashboardCourseStats/DashboardCourseStats";

const DashboardPage = () => {
  const [courses] = useAtom(coursesAtom);
  const [equipment] = useAtom(equipmentAtom);

  return (
    <>
      <div className="px-[32px] p-4 text-3xl flex justify-between text-white">
        Dashboard
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-4 p-8">
        <div className="lg:col-span-2 flex flex-col gap-2">
          {courses.map((course) => (
            <DashboardCourseStats course={course} key={course._id} />
          ))}
        </div>

        <div className="lg:col-span-2">
          {equipment.categories?.map((item) => (
            <div className="h-32 rounded-lg bg-[#282833] stat mb-4" key={item}>
              <div className="stat-title">{item}</div>
              <div className="stat-value text-2xl">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
