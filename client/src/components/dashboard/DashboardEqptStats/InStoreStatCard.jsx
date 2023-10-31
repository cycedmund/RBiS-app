import { useState } from "react";
import { showItemsPerPage } from "../../../utilities/common/pagination-service";
import DashboardCardDivider from "../../common/Divider/DashboardCardDivider";
import PaginationButton from "../../common/Pagination/PaginationButton";

const InStoreStatCard = ({ inStoreUnits }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const unitsPerPage = 8;

  const inStoreUnitsPerPage = showItemsPerPage(
    currentPage,
    inStoreUnits,
    unitsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-lg bg-[#282833] p-4 flex flex-grow flex-col">
      <div className="stat-title font-medium text-[#e9e9ea] text-center font-raleway text-xl">
        In Store
      </div>
      <div className="stat-value text-4xl font-raleway font-bold text-[#675D50] text-center">
        {inStoreUnits.length > 0 ? (
          inStoreUnits.length
        ) : (
          <span className="text-[#e9e9ea]">-</span>
        )}
      </div>
      {inStoreUnits.length > 0 && (
        <DashboardCardDivider text={"Equipment Units"} />
      )}
      {inStoreUnitsPerPage.map((unit) => (
        <ul
          className="my-0.5 flex justify-center items-center"
          key={unit.serialNumber}
        >
          <li className="flex w-3/4 items-center justify-between text-xs leading-tight p-1 px-2 font-normal text-[#e9e9ea] rounded-sm bg-[#675D50]">
            {unit.equipment}
            <span className="badge bg-stone-400 text-[#282833] badge-sm text-[10px] gap-2 justify-end">
              {unit.serialNumber}
            </span>
          </li>
        </ul>
      ))}
      <div className="mt-auto">
        {inStoreUnits.length > unitsPerPage && (
          <PaginationButton
            items={inStoreUnits}
            itemsPerPage={unitsPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default InStoreStatCard;
