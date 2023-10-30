import { useAtom } from "jotai";
import {
  equipmentAtom,
  selectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import { GiMissileLauncher, GiRadarSweep, GiPocketRadio } from "react-icons/gi";
import { LiaToolsSolid } from "react-icons/lia";
import Divider from "../../components/common/Divider/Divider";
import EquipmentStats from "../../components/equipment/EquipmentStats/EquipmentStats";
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { addEquipmentHelper } from "../../helpers/equipmentHelpers/addEquipmentHelper";

const EquipmentPage = () => {
  const [equipment, setEquipment] = useAtom(equipmentAtom);
  const [user] = useAtom(userAtom);
  const [selectedCourse] = useAtom(selectedCourseAtom);

  const isInstructor = user.role === "instructor" || user.role === "admin";
  const isWeaponStoreIC = selectedCourse?.weaponStoreIC?._id === user._id;

  // const handleClick = (category) => {
  //   setSelectedCategory(category);
  // };
  const handleAddEquipment = async () => {
    addEquipmentHelper(setEquipment);
  };

  return (
    <div className="relative">
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
      {(isWeaponStoreIC || isInstructor) && (
        <button
          className="min-w-[10%] bg-[#7299f2] px-3 py-2 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center absolute top-5 right-2"
          onClick={() => handleAddEquipment()}
        >
          <GrAdd className="md:pr-2 text-xl" />
          <span className="hidden sm:block">Add Equipment</span>
        </button>
      )}

      {/* {selectedCategory && <EquipmentTable />} */}
    </div>
  );
};

export default EquipmentPage;
