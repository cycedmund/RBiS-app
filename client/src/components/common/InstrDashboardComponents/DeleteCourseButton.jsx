import _ from "lodash";
import { PiHandWaving } from "react-icons/pi";
import Loading from "../Loading/Loading";

const DeleteCourseButton = ({ handleDeleteCourse, selectedCourse }) => {
  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }

  return (
    <button
      className="sm:min-w-[7%] min-w-[5%] bg-[#c87575] px-2 py-1.5 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center mt-4 ml-2 mb-4"
      onClick={() => handleDeleteCourse(selectedCourse._id)}
    >
      <PiHandWaving className="text-sm mr-1 sm:text-base" />
      <span>Delete Course</span>
    </button>
  );
};

export default DeleteCourseButton;
