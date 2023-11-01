import { useAtom } from "jotai";
import { GrAdd } from "react-icons/gr";
import { AiOutlineStop } from "react-icons/ai";
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
      className="sm:min-w-[7%] min-w-[5%] bg-[#CD5A5A] px-2 py-1.5 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-6 mb-4"
      onClick={() => handleDeleteInstructor()}
    >
      <AiOutlineStop className="text-sm mr-1 sm:text-base" />
      <span className="">Destruct</span>
    </button>
  ) : (
    <button
      className="sm:min-w-[7%] min-w-[5%] bg-[#7299f2] px-2 py-1.5 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-6"
      onClick={() => handleAddInstructor()}
    >
      <GrAdd className="text-xs mr-1 sm:text-sm" />
      <span className="">Instruct</span>
    </button>
  );
};

export default AddRemoveInstructor;
