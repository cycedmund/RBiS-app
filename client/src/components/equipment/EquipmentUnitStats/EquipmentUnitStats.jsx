import { useEffect, useState } from "react";
import { RxCheck, RxCross2 } from "react-icons/rx";
import _ from "lodash";
import Loading from "../../common/Loading/Loading";
import CategoryIcon from "../../common/CategoryIcon/CategoryIcon";
import EquipmentUnitCard from "../EquipmentUnitCard/EquipmentUnitCard";

const EquipmentUnitStats = ({ equipment, category }) => {
  const [equipmentOutside, setEquipmentOutside] = useState([]);

  useEffect(() => {
    const filteredEquipment = equipment.equipment?.filter((item) => {
      return (
        item.category === category &&
        item.units.some((unit) => unit.status === "Outside Store")
      );
    });
    setEquipmentOutside(filteredEquipment);
  }, [equipment, category]);

  if (_.isEmpty(equipment)) {
    return <Loading />;
  }

  const currentCategory = equipment.counts?.find(
    (item) => item.category === category
  );

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl text-[#e9e9ea]">
        {currentCategory?.category}
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 text-[#F1EFEF]">
        <div className="stat">
          <div className="stat-figure sm:mr-10">
            <CategoryIcon category={currentCategory} />
          </div>
          <div className="stat-title font-light sm:text-base text-sm text-[#A9A9A9]">
            Total
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#e9e9ea]">
            {currentCategory?.count}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-[#00917C] sm:mr-10">
            <RxCheck className="text-5xl sm:text-6xl" />
          </div>
          <div className="stat-title sm:text-base text-sm text-[#A9A9A9] font-light">
            In Store
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#00917C]">
            {currentCategory?.inStoreCount}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-[#D49A89] sm:mr-10">
            <RxCross2 className="text-4xl sm:text-5xl" />
          </div>
          <div className="stat-title font-light sm:text-base text-sm text-[#A9A9A9]">
            Outside Store
          </div>
          <div className="stat-value text-3xl sm:text-4xl font-medium text-[#D49A89]">
            {currentCategory?.outsideStoreCount}
          </div>
        </div>
      </div>
      {currentCategory.outsideStoreCount > 0 && (
        <div className="divider divider-vertical mx-6 font-raleway after:bg-[#38383d] before:bg-[#38383d] font-semibold text-[#C2B092]">
          Outside Store
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 px-6 md:px-0">
        {equipmentOutside?.map((item) => (
          <EquipmentUnitCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentUnitStats;
