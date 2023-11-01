import { useAtom } from "jotai";
import {
  equipmentAtom,
  selectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import Divider from "../../components/common/Divider/Divider";
import EquipmentStats from "../../components/equipment/EquipmentStats/EquipmentStats";
import { GrAdd } from "react-icons/gr";
import { addEquipmentHelper } from "../../helpers/equipmentHelpers/addEquipmentHelper";
import EquipmentCard from "../../components/equipment/EquipmentCard/EquipmentCard";

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
      <EquipmentStats equipment={equipment} />
      <Divider />
      <div className="flex items-center justify-center flex-col sm:flex-wrap sm:flex-row gap-10 sm:gap-12 mb-4 px-8 mt-10 sm:mt-8">
        {equipment?.categories?.length > 0 &&
          equipment.categories.map((category) => (
            <EquipmentCard key={category} category={category} />
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

// <div
//   key={category}
//   className={`card lg:card-side min-w-full bg-[#282833] shadow-xl`}
// >
//   <figure className="px-10 py-5">
//     {category === "RBS 70" ? (
//       <GiMissileLauncher className="text-9xl" />
//     ) : category === "PSTAR" ? (
//       <GiRadarSweep className="text-9xl" />
//     ) : category === "Signal" ? (
//       <GiPocketRadio className="text-9xl" />
//     ) : (
//       <LiaToolsSolid className="text-9xl" />
//     )}
//   </figure>
//   <div className="card-body justify-between">
//     <h2 className="card-title">{category}</h2>
//     <p>Find out more!</p>
//     <div className="card-actions justify-end">
//       <Link
//         className="btn"
//         to={`/dashboard/equipment/${category}`}
//         // onClick={() => handleClick(category)}
//       >
//         Details
//       </Link>
//     </div>
//   </div>
// </div>
