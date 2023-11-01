import { useAtom } from "jotai";
import { GiClick } from "react-icons/gi";
import {
  selectedCourseAtom,
  userAtom,
} from "../../../utilities/atom-jotai/atom";

const LocationBadge = ({ unit, handleEditLocation }) => {
  const [user] = useAtom(userAtom);
  const [selectedCourse] = useAtom(selectedCourseAtom);
  const isWeaponStoreIC = user._id === selectedCourse.weaponStoreIC._id;
  const isInstructor = user.role === "instructor" || user.role === "admin";

  const handleEdit = () => {
    if (
      isWeaponStoreIC ||
      user.role === "instructor" ||
      user.role === "admin"
    ) {
      handleEditLocation(unit);
    }
  };

  return (
    <span className="relative">
      {unit.status === "In Store" ? (
        <span
          className={`bg-[#0d9488] text-[#134e4a] text-xs sm:text-sm font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-[#134e4a] dark:text-[#F7EFE5] ${
            isWeaponStoreIC || isInstructor
              ? "cursor-pointer"
              : "cursor-default"
          } md:w-24 whitespace-nowrap`}
          onClick={handleEdit}
        >
          {unit.status}
        </span>
      ) : (
        <span
          className={`bg-[#0F0F0F] text-[#D49A89] text-xs sm:text-sm font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-[#BB5A5A] dark:text-[#0F0F0F] ${
            isWeaponStoreIC || isInstructor
              ? "cursor-pointer"
              : "cursor-default"
          } md:w-24 whitespace-nowrap`}
          onClick={handleEdit}
        >
          {unit.status}
        </span>
      )}
      {(isWeaponStoreIC || isInstructor) && (
        <span
          onClick={handleEdit}
          className="absolute bottom-0 right-0 -mb-3 -mr-1 cursor-pointer md:absolute"
        >
          <GiClick className="text-lg text-[#a8a29e]" />
        </span>
      )}
    </span>
  );
};
export default LocationBadge;
