import { useAtom } from "jotai";
import { GrAdd } from "react-icons/gr";
import { userAtom } from "../../../utilities/atom-jotai/atom";
import _ from "lodash";
import Loading from "../Loading/Loading";

const AddRemoveInstructor = ({
  selectedCourse,
  handleAddInstructor,
  handleDeleteInstructor,
}) => {
  const [user] = useAtom(userAtom);

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }

  return selectedCourse.instructors.some((instr) => instr._id === user._id) ? (
    <button
      className="sm:min-w-[10%] min-w-[5%] bg-[#CD5A5A] px-3 py-1.5 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-6 mb-4"
      onClick={() => handleDeleteInstructor()}
    >
      <GrAdd className="md:pr-2 text-xl" />
      <span className="">Remove Instructor</span>
    </button>
  ) : (
    <button
      className="sm:min-w-[10%] min-w-[5%] bg-[#7299f2] px-3 py-1.5 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-6"
      onClick={() => handleAddInstructor()}
    >
      <GrAdd className="md:pr-2 text-sm sm:text-xl" />
      <span className="hidden sm:block">Add as Instructor</span>
    </button>
  );
};

export default AddRemoveInstructor;
