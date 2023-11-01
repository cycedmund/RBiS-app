import { useState } from "react";
import { getStatusAbbr } from "../../../helpers/dashboardHelpers/getStatusAbbr";
import { showItemsPerPage } from "../../../utilities/common/pagination-service";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import PaginationButton from "../../common/Pagination/PaginationButton";

const PresentStatCard = ({ traineesPresent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const traineesPerPage = 8;

  const presentTraineesPerPage = showItemsPerPage(
    currentPage,
    traineesPresent,
    traineesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
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
  );
};

export default PresentStatCard;
