import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import Divider from "../../components/common/Divider/Divider";
import EquipmentTable from "../../components/equipment/EquipmentTable/EquipmentTable";
import EquipmentUnitStats from "../../components/equipment/EquipmentUnitStats/EquipmentUnitStats";
import { addEquipmentHelper } from "../../helpers/equipmentHelpers/addEquipmentHelper";
import {
  equipmentAtom,
  selectedCourseAtom,
  userAtom,
} from "../../utilities/atom-jotai/atom";
import { GrAdd } from "react-icons/gr";

const EquipmentUnitPage = () => {
  const { category } = useParams();
  const [equipment, setEquipment] = useAtom(equipmentAtom);
  const [user] = useAtom(userAtom);
  const [selectedCourse] = useAtom(selectedCourseAtom);

  const isInstructor = user.role === "instructor" || user.role === "admin";
  const isWeaponStoreIC = selectedCourse?.weaponStoreIC._id === user._id;

  const handleAddEquipment = async () => {
    addEquipmentHelper(setEquipment);
  };

  return (
    <div className="relative">
      <EquipmentUnitStats category={category} equipment={equipment} />
      <Divider />
      <EquipmentTable category={category} />
      {(isWeaponStoreIC || isInstructor) && (
        <button
          className="min-w-[10%] bg-[#7299f2] px-3 py-2 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center absolute top-5 right-2"
          onClick={() => handleAddEquipment()}
        >
          <GrAdd className="md:pr-2 text-xl" />
          <span className="hidden sm:block">Add Equipment</span>
        </button>
      )}
    </div>
  );
};

export default EquipmentUnitPage;
