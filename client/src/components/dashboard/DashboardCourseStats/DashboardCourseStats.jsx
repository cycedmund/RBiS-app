import { useState } from "react";
import { showTraineesPerPage } from "../../../utilities/common/pagination-service";
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

  const absentTraineesPerPage = showTraineesPerPage(
    currentPage,
    traineesAbsent,
    traineesPerPage
  );
  const presentTraineesPerPage = showTraineesPerPage(
    currentPage,
    traineesPresent,
    traineesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-2 lg:flex-row font-roboto font-extralight">
      <div className="h-auto w-full rounded-lg bg-[#282833] flex flex-col justify-center p-4">
        <div className="stat-title text-white">Course Name</div>
        <div className="stat-value text-xl text-white">{course.course}</div>
        <div className="stat-title text-white">Total Trainees</div>
        <div className="stat-value text-xl text-white">
          {course.trainees.length}
        </div>
        <div className="stat-title text-white">Course IC</div>
        <div className="stat-value text-xl text-white">
          {course.courseIC.formattedFullName}
        </div>
        <div className="stat-title text-white">Course IC</div>
        <div className="stat-value text-xl text-white">
          {course.weaponStoreIC.formattedFullName}
        </div>
      </div>

      <div className="h-auto w-full flex flex-col gap-2">
        <div className="rounded-lg bg-[#282833] p-4 flex-grow">
          <div className="stat-title text-white">Trainees Present</div>
          <div className="stat-value text-2xl text-white">
            {traineesPresent.length}
          </div>
          {presentTraineesPerPage.map((trainee) => (
            <div key={trainee.id} className="stat-desc">
              <div className="text-white">
                {trainee.rank} {trainee.formattedFullName}
              </div>
            </div>
          ))}
          {traineesPresent.length > traineesPerPage && (
            <PaginationButton
              traineesAbsent={traineesPresent}
              traineesPerPage={traineesPerPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </div>

        <div className="rounded-lg bg-[#282833] p-4 flex-grow">
          <div className="stat-title text-white">Trainees Absent</div>
          <div className="stat-value text-2xl text-white">
            {traineesAbsent.length}
          </div>
          {absentTraineesPerPage.map((trainee) => (
            <div key={trainee.id} className="stat-desc">
              <div className="text-red-400">
                {trainee.rank} {trainee.formattedFullName}
              </div>
            </div>
          ))}
          {traineesAbsent.length > traineesPerPage && (
            <PaginationButton
              traineesAbsent={traineesAbsent}
              traineesPerPage={traineesPerPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCourseStats;
