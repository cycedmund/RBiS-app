import { useState } from "react";
import { getStatusAbbr } from "../../../helpers/dashboardHelpers/getStatusAbbr";
import { showItemsPerPage } from "../../../utilities/common/pagination-service";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import PaginationButton from "../../common/Pagination/PaginationButton";

const AbsentStatCard = ({ traineesAbsent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const traineesPerPage = 8;

  const absentTraineesPerPage = showItemsPerPage(
    currentPage,
    traineesAbsent,
    traineesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
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
  );
};

export default AbsentStatCard;
