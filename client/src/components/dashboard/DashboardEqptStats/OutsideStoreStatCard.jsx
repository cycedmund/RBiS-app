import { useState } from "react";
import { showItemsPerPage } from "../../../utilities/common/pagination-service";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import PaginationButton from "../../common/Pagination/PaginationButton";

const OutsideStoreStatCard = ({ outsideStoreUnits }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const unitsPerPage = 8;

  const outsideStoreUnitsPerPage = showItemsPerPage(
    currentPage,
    outsideStoreUnits,
    unitsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-lg bg-[#282833] p-4 flex-grow flex flex-col">
      <div className="stat-title font-medium text-[#e9e9ea] text-center font-raleway text-xl">
        Outside Store
      </div>
      <div className="stat-value text-4xl font-raleway font-bold text-[#c47361] text-center">
        {outsideStoreUnits.length > 0 ? (
          outsideStoreUnits.length
        ) : (
          <span className="text-[#e9e9ea]">-</span>
        )}
      </div>
      {outsideStoreUnits.length > 0 && (
        <DashboardCardDivider text={"Equipment Units"} />
      )}
      {outsideStoreUnitsPerPage.map((unit) => (
        <ul
          className="my-0.5 flex justify-center items-center"
          key={unit.serialNumber}
        >
          <li className="flex w-3/4 items-center justify-between text-xs leading-tight p-1 px-2 font-normal text-[#282833] rounded-sm bg-[#c47361]">
            {unit.equipment}
            <span className="badge bg-stone-400 text-[#282833] badge-sm text-[10px] gap-2 justify-end">
              {unit.serialNumber}
            </span>
          </li>
        </ul>
      ))}
      <div className="mt-auto">
        {outsideStoreUnits.length > unitsPerPage && (
          <PaginationButton
            items={outsideStoreUnits}
            itemsPerPage={unitsPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default OutsideStoreStatCard;
