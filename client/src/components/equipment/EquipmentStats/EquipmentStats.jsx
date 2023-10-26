import { Fragment } from "react";
import { BsChevronCompactRight, BsChevronDoubleRight } from "react-icons/bs";
import { getTotalCount } from "../../../helpers/equipmentHelpers/getTotalCount";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";

const EquipmentStats = ({ equipment }) => {
  const totalStoreCount = getTotalCount(equipment);

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl">
        Equipment Catalog <span></span>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BsChevronCompactRight className="text-7xl" />
          </div>
          <div className="stat-title">Total Equipment</div>
          <div className="stat-value">{equipment.totalEquipmentCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <HiOutlineLogin className="text-5xl" />
          </div>
          <div className="stat-title">In Store</div>
          <div className="stat-value">{totalStoreCount?.inStoreCount}</div>
          <div className="stat-desc"></div>
        </div>

        <div className="stat">
          <div className="stat-figure text-error">
            <HiOutlineLogout className="text-5xl" />
          </div>
          <div className="stat-title">Outside Store</div>
          <div className="stat-value">{totalStoreCount?.outsideStoreCount}</div>
          <div className="stat-desc"></div>
        </div>

        {equipment.counts?.map((category, index) => (
          <Fragment key={index}>
            <div className="stat">
              <div className="stat-figure text-neutral-content">
                <BsChevronDoubleRight className="text-6xl" />
              </div>
              <div className="stat-title">Category</div>
              <div className="stat-value">{category.category}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-success">
                <HiOutlineLogin className="text-5xl" />
              </div>
              <div className="stat-title">In Store</div>
              <div className="stat-value">{category.inStoreCount}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-error">
                <HiOutlineLogout className="text-5xl" />
              </div>
              <div className="stat-title">Outside Store</div>
              <div className="stat-value">{category.outsideStoreCount}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default EquipmentStats;
