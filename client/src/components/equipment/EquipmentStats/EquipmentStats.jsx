import { Fragment } from "react";
import { VscSignOut, VscSignIn } from "react-icons/vsc";
import { BsChevronCompactRight } from "react-icons/bs";
import { getTotalCount } from "../../../helpers/equipmentHelpers/getTotalCount";
import CategoryIcon from "../../common/CategoryIcon/CategoryIcon";
import _ from "lodash";
import Loading from "../../common/Loading/Loading";

const EquipmentStats = ({ equipment }) => {
  if (_.isEmpty(equipment)) {
    return <Loading />;
  }
  const totalStoreCount = getTotalCount(equipment);

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl text-[#e9e9ea]">Equipment</div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 font-roboto font-light">
        <div className="stat">
          <div className="stat-figure text-violet-500 sm:mr-10">
            <BsChevronCompactRight className="text-4xl sm:text-5xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Total Equipment
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#e9e9ea]">
            {equipment.totalEquipmentCount}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-[#00917C] sm:mr-10">
            <VscSignIn className="text-4xl sm:text-5xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            In Store
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#e9e9ea]">
            {totalStoreCount?.inStoreCount}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-[#D49A89] sm:mr-10">
            <VscSignOut className="text-4xl sm:text-5xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
            Outside Store
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#e9e9ea]">
            {totalStoreCount?.outsideStoreCount}
          </div>
        </div>
        <div className="divider divider-vertical after:bg-[#38383d] before:bg-[#38383d] px-6 md:col-span-3 font-raleway font-semibold text-[#C2B092]">
          Breakdown
        </div>
        {equipment.counts.length > 0 &&
          equipment.counts?.map((category, index) => (
            <Fragment key={index}>
              <div className="stat">
                <div className="stat-figure text-neutral-content sm:mr-10">
                  <CategoryIcon category={category} />
                </div>
                <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
                  Category
                </div>
                <div
                  className={`stat-value text-2xl sm:text-3xl font-normal ${
                    category.category === "RBS 70"
                      ? "text-[#6D8B74]"
                      : category.category === "PSTAR"
                      ? "text-[#5AA469]"
                      : category.category === "Signal"
                      ? "text-[#C7BEA2]"
                      : "text-[#9F8772]"
                  }`}
                >
                  {category.category}
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-[#00917C] sm:mr-10">
                  <VscSignIn className="text-4xl sm:text-5xl" />
                </div>
                <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
                  In Store
                </div>
                <div className="stat-value text-3xl sm:text-4xl font-medium text-[#e9e9ea]">
                  {category.inStoreCount}
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-[#D49A89] sm:mr-10">
                  <VscSignOut className="text-4xl sm:text-5xl" />
                </div>
                <div className="stat-title sm:text-base text-sm text-[#A9A9A9]">
                  Outside Store
                </div>
                <div className="stat-value text-3xl sm:text-4xl font-medium text-[#e9e9ea]">
                  {category.outsideStoreCount}
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default EquipmentStats;
