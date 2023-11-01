import _ from "lodash";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import Loading from "../../common/Loading/Loading";
import AbsentStatCard from "./AbsentStatCard";
import PresentStatCard from "./PresentStatCard";

const DashboardCourseStats = ({ course }) => {
  if (_.isEmpty(course)) {
    return <Loading />;
  }

  const traineesPresent = course.totalPresent || [];
  const traineesAbsent = course.trainees.filter(
    (trainee) =>
      trainee.status[0].status !== "Present" &&
      trainee.status[0].status !== "Light Duty"
  );

  return (
    <div className="flex flex-col flex-grow gap-2 lg:flex-row font-roboto font-extralight">
      <div className="h-auto w-full rounded-lg bg-[#282833] flex flex-col p-4 text-[#e9e9ea] text-center">
        <div className="stat-title font-roboto font-medium text-[#e9e9ea] text-xl">
          {course.course}
        </div>
        <DashboardCardDivider text={"Instructors"} />
        {course.instructors.length > 0 ? (
          course.instructors.map((instr) => (
            <div
              className="stat-value text-lg font-raleway font-light text-purple-400"
              key={instr._id}
            >
              {instr.rank} {instr.formattedFullName}
            </div>
          ))
        ) : (
          <span className="text-[#e9e9ea]">-</span>
        )}
        <DashboardCardDivider text={"Total Trainees"} />
        <div className="stat-value text-4xl font-raleway font-bold">
          {course.trainees.length}
        </div>
        <DashboardCardDivider text={"Course IC"} />
        <div className="stat-value text-lg font-raleway font-light text-accent">
          {course.courseIC.rank} {course.courseIC.formattedFullName}
        </div>
        <DashboardCardDivider text={"Weapon Store IC"} />
        <div className="stat-value text-lg font-raleway font-light text-error">
          {course.weaponStoreIC.rank} {course.weaponStoreIC.formattedFullName}
        </div>
      </div>

      <div className="h-auto w-full flex flex-col gap-2">
        <PresentStatCard traineesPresent={traineesPresent} />
        <AbsentStatCard traineesAbsent={traineesAbsent} />
      </div>
    </div>
  );
};

export default DashboardCourseStats;
