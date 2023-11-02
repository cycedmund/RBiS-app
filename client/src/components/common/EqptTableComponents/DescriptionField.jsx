import { useAtom } from "jotai";
import {
  selectedCourseAtom,
  userAtom,
} from "../../../utilities/atom-jotai/atom";

const DescriptionField = ({ unit, handleEditDescription }) => {
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
      handleEditDescription(unit);
    }
  };

  return (
    <div className="relative">
      {unit.description !== "" ? (
        <div
          className={`${
            isWeaponStoreIC || isInstructor ? "cursor-text" : "cursor-default"
          }`}
          onClick={handleEdit}
        >
          <div className="sm:max-w-[200px] sm:max-h-[80px] max-h-[70px] overflow-auto p-2 sm:text-sm text-xs font-normal mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-indigo-200 border border-indigo-400">
            {unit.description.split("\n").map((line, index) => (
              <div key={index} className="whitespace-pre-line">
                {line}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p
          className={`max-w-[200px] sm:text-sm text-xs font-normal mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-zinc-500 border border-indigo-400 ${
            isWeaponStoreIC || isInstructor ? "cursor-text" : "cursor-default"
          }`}
          onClick={handleEdit}
        >
          No Description
        </p>
      )}
    </div>
  );
};

export default DescriptionField;
