import { useAtom } from "jotai";
import { GrAdd } from "react-icons/gr";
import { userAtom } from "../../../utilities/atom-jotai/atom";
import _ from "lodash";

const AddRemoveInstructor = ({
  selectedCourse,
  handleAddInstructor,
  handleDeleteInstructor,
}) => {
  const [user] = useAtom(userAtom);

  return !_.isEmpty(selectedCourse) &&
    selectedCourse?.instructors?.some((instr) => instr._id === user._id) ? (
    <button
      className="min-w-[10%] bg-[#7299f2] px-3 py-2 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-6"
      onClick={() => handleDeleteInstructor()}
    >
      <GrAdd className="md:pr-2 text-xl" />
      <span className="hidden sm:block">Remove Instructor</span>
    </button>
  ) : (
    <button
      className="min-w-[10%] bg-[#7299f2] px-3 py-2 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-6"
      onClick={() => handleAddInstructor()}
    >
      <GrAdd className="md:pr-2 text-xl" />
      <span className="hidden sm:block">Add as Instructor</span>
    </button>
  );
};

export default AddRemoveInstructor;
