import { useAtom } from "jotai";
import { equipmentAtom } from "../../utilities/atom-jotai/atom";
import { GiMissileLauncher, GiRadarSweep, GiPocketRadio } from "react-icons/gi";
import { LiaToolsSolid } from "react-icons/lia";
import Divider from "../../components/common/Divider/Divider";
import EquipmentStats from "../../components/equipment/EquipmentStats/EquipmentStats";
import { Link } from "react-router-dom";

const EquipmentDashboardPage = () => {
  const [equipment] = useAtom(equipmentAtom);

  const handleClick = (category) => {
    // setSelectedCategory(category);
  };

  return (
    <div>
      {/* <div className="tabs">
        {equipment?.categories?.length > 0 &&
          equipment.categories.map((category) => (
            <div
              key={category}
              className={`tab tab-bordered ${
                category === selectedCategory ? "tab-active" : ""
              }`}
              onClick={() => handleClick(category)}
            >
              {category}
            </div>
          ))}
      </div> */}
      <EquipmentStats equipment={equipment} />
      <Divider />
      <div className="grid grid-cols-2 gap-4 mb-4 px-8">
        {equipment?.categories?.length > 0 &&
          equipment.categories.map((category) => (
            <div
              key={category}
              className={`card lg:card-side min-w-full bg-gray-700 shadow-xl`}
              onClick={() => handleClick(category)}
            >
              <figure className="px-10 py-5">
                {category === "RBS 70" ? (
                  <GiMissileLauncher className="text-9xl" />
                ) : category === "PSTAR" ? (
                  <GiRadarSweep className="text-9xl" />
                ) : category === "Signal" ? (
                  <GiPocketRadio className="text-9xl" />
                ) : (
                  <LiaToolsSolid className="text-9xl" />
                )}
              </figure>
              <div className="card-body justify-between">
                <h2 className="card-title">{category}</h2>
                <p>Find out more!</p>
                <div className="card-actions justify-end">
                  <Link
                    className="btn"
                    to={`/dashboard/equipment/${category}`}
                    // onClick={() => handleClick(category)}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* {selectedCategory && <EquipmentTable />} */}
    </div>
  );
};

export default EquipmentDashboardPage;
