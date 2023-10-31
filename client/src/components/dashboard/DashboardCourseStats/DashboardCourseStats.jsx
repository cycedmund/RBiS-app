import { useState } from "react";
import { getStatusAbbr } from "../../../helpers/dashboardHelpers/getStatusAbbr";
import { showItemsPerPage } from "../../../utilities/common/pagination-service";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import PaginationButton from "../../common/Pagination/PaginationButton";

const DashboardCourseStats = ({ course }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const traineesPresent = course.totalPresent || [];
  const traineesAbsent = course.trainees.filter(
    (trainee) =>
      trainee.status[0].status !== "Present" &&
      trainee.status[0].status !== "Light Duty"
  );

  const traineesPerPage = 5;

  const absentTraineesPerPage = showItemsPerPage(
    currentPage,
    traineesAbsent,
    traineesPerPage
  );
  const presentTraineesPerPage = showItemsPerPage(
    currentPage,
    traineesPresent,
    traineesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <div className="rounded-lg bg-[#282833] p-4 flex-grow flex flex-col">
          <div className="stat-title font-medium text-[#e9e9ea] text-center font-raleway text-xl">
            Trainees Present
          </div>
          <div className="stat-value text-4xl font-raleway font-bold text-[#456a5f] text-center">
            {traineesPresent.length > 0 ? (
              traineesPresent.length
            ) : (
              <span className="text-[#e9e9ea]">-</span>
            )}
          </div>
          {traineesPresent.length > 0 && (
            <DashboardCardDivider text={"Rank & Name"} />
          )}
          {presentTraineesPerPage.map((trainee) => (
            <ul
              key={trainee.id}
              className="my-0.5 flex justify-center items-center"
            >
              <li className="flex w-3/4 items-center justify-between text-xs leading-tight p-1 px-2 font-normal text-[#e9e9ea] rounded-sm bg-[#456a5f]">
                {trainee.rank} {trainee.formattedFullName}
                {trainee.status[0].status === "Light Duty" && (
                  <span className="badge bg-amber-500 text-[#282833] badge-sm text-[10px] gap-2 justify-end">
                    {getStatusAbbr(trainee.status[0].status)}
                  </span>
                )}
              </li>
            </ul>
          ))}
          <div className="mt-auto">
            {traineesPresent.length > traineesPerPage && (
              <PaginationButton
                items={traineesPresent}
                itemsPerPage={traineesPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </div>

        <div className="rounded-lg bg-[#282833] p-4 flex-grow flex flex-col">
          <div className="stat-title font-medium text-[#e9e9ea] font-raleway text-center text-xl">
            Trainees Absent
          </div>
          <div className="stat-value text-4xl font-raleway font-bold text-[#ee7f81] text-center">
            {traineesAbsent.length > 0 ? (
              traineesAbsent.length
            ) : (
              <span className="text-[#e9e9ea]">-</span>
            )}
          </div>
          {traineesAbsent.length > 0 && (
            <DashboardCardDivider text={"Rank & Name"} />
          )}
          {absentTraineesPerPage.map((trainee) => (
            <ul
              key={trainee.id}
              className="my-0.5 flex justify-center items-center"
            >
              <li className="flex w-3/4 items-center justify-between text-xs leading-tight p-0.5 px-2 font-normal text-[#282833] rounded-sm bg-[#ee7f81]">
                {trainee.rank} {trainee.formattedFullName}
                <span className="badge bg-red-500 text-[#282833] badge-sm text-[10px] gap-2 justify-end">
                  {getStatusAbbr(trainee.status[0].status)}
                </span>
              </li>
            </ul>
          ))}
          <div className="mt-auto">
            {traineesAbsent.length > traineesPerPage && (
              <PaginationButton
                items={traineesAbsent}
                itemsPerPage={traineesPerPage}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseStats;
