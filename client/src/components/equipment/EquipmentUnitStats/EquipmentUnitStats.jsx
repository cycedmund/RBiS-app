// import { Fragment } from "react";
import { useEffect, useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";

const EquipmentUnitStats = ({ equipment, category }) => {
  const [equipmentOutside, setEquipmentOutside] = useState([]);
  const currentCategory = equipment.counts?.find(
    (item) => item.category === category
  );

  useEffect(() => {
    const equipmentOutside = equipment.equipment?.filter((item) => {
      return (
        item.category === category &&
        item.units.some((unit) => unit.status === "Outside Store")
      );
    });
    setEquipmentOutside(equipmentOutside);
  }, [equipment, category]);

  return (
    <div>
      <div className="px-[32px] p-4 text-3xl">{currentCategory?.category}</div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BsChevronCompactRight className="text-7xl" />
          </div>
          <div className="stat-title">Total</div>
          <div className="stat-value">{currentCategory?.count}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-info">
            <HiOutlineLogin className="text-5xl text-success" />
          </div>
          <div className="stat-title">In Store</div>
          <div className="stat-value">{currentCategory?.inStoreCount}</div>
          <div className="stat-desc"></div>
        </div>

        <div className="stat">
          <div className="stat-figure text-error">
            {/* <HiOutlineLogout className="text-5xl text-error" /> */}
            <BsChevronCompactRight className="text-5xl" />
          </div>
          <div className="stat-title">Outside Store</div>
          <div className="stat-value">{currentCategory?.outsideStoreCount}</div>
          <div className="stat-desc"></div>
        </div>
      </div>
      <div className="px-6 grid grid-cols-1 md:grid-cols-4">
        {/* <div className="stat">
          <div className="stat-figure text-info">
            <BsChevronCompactRight className="text-7xl" />
          </div>
          <div className="stat-title">Outside Store</div>
          <div className="stat-value">{currentCategory?.outsideStoreCount}</div>
          <div className="stat-desc"></div>
        </div> */}

        {equipmentOutside?.map((item) => (
          <div className="stat flex items-center" key={item._id}>
            <div className="stat-value flex-1">{item.equipment}</div>
            <div className="stat-figure text-error text-5xl">
              {
                item.units.filter((unit) => unit.status === "Outside Store")
                  .length
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentUnitStats;
