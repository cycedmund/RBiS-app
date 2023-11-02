import { useAtom } from "jotai";
import {
  setSelectedCourseAtom,
  userAtom,
} from "../../../utilities/atom-jotai/atom";
import {
  statusSwal,
  locationSwal,
} from "../../../helpers/traineesHelpers/swal/statusLocationSwal";
import {
  statusToAll,
  locationToAll,
} from "../../../helpers/traineesHelpers/toAllTrainees/applyToAll";
import {
  statusToOne,
  locationToOne,
} from "../../../helpers/traineesHelpers/toOneTrainee/applyToOne";
import { applyAllSwal } from "../../../helpers/traineesHelpers/swal/applyAllSwal";
import {
  FaPersonMilitaryPointing,
  FaPersonMilitaryRifle,
} from "react-icons/fa6";
import { LiaHandPointLeftSolid } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import StatusBadge from "../../common/StatusBadge/StatusBadge";
import _ from "lodash";
import Loading from "../../common/Loading/Loading";
import TraineeDeleteButton from "../../common/TraineeDeleteButton/TraineeDeleteButton";

const CourseTable = ({ course, handleAssignIC, handleDeleteTrainee }) => {
  const [user] = useAtom(userAtom);
  const [, setSelectedCourse] = useAtom(setSelectedCourseAtom);

  if (_.isEmpty(course)) {
    return <Loading />;
  }

  const weaponStoreIcId = course.weaponStoreIC?._id || null;
  const courseIcId = course.courseIC?._id || null;
  const isTrainee = user.role === "trainee";
  //user.role === admin for dev rights
  const isInstructorOfCourse = course.instructors.some(
    (instr) => user._id === instr._id
  );

  const handleEditStatus = async (trainee) => {
    const isCourseIC = user._id === courseIcId;
    const { value: selectedStatus } = await statusSwal(trainee, isCourseIC);

    if (selectedStatus) {
      if (isCourseIC) {
        const { isConfirmed: applyAll } = await applyAllSwal();

        if (applyAll) {
          await statusToAll(selectedStatus, course, setSelectedCourse);
        } else {
          await statusToOne(selectedStatus, trainee, course, setSelectedCourse);
        }
      } else {
        await statusToOne(selectedStatus, trainee, course, setSelectedCourse);
      }
    }
  };

  const handleEditLocation = async (trainee) => {
    const isCourseIC = user._id === courseIcId;
    const { value: selectedLocation } = await locationSwal(trainee, isCourseIC);

    if (selectedLocation) {
      if (isCourseIC) {
        const { isConfirmed: applyAll } = await applyAllSwal();

        if (applyAll) {
          await locationToAll(selectedLocation, course, setSelectedCourse);
        } else {
          await locationToOne(
            selectedLocation,
            trainee,
            course,
            setSelectedCourse
          );
        }
      } else {
        await locationToOne(
          selectedLocation,
          trainee,
          course,
          setSelectedCourse
        );
      }
    }
  };

  return (
    <div className={`${isTrainee ? "p-6 py-8 relative" : "px-6"}`}>
      <div className="overflow-x-auto min-w-full font-roboto font-medium">
        <table className="min-w-full table-sm lg:table-sm md:table-md sm:table-sm table-auto mt-4">
          <thead>
            <tr className="text-left text-gray-400 text-xs">
              <th className="font-semibold w-[7%]">S/N</th>
              <th className="font-semibold w-[23%]">NAME</th>
              {!isTrainee && isInstructorOfCourse && (
                <th className="font-semibold w-[15%]">COURSE IC</th>
              )}
              {!isTrainee && isInstructorOfCourse && (
                <th className="font-semibold w-[15%]">STORE IC</th>
              )}
              <th className="font-semibold w-[20%]">STATUS</th>
              <th className="font-semibold w-[20%]">LOCATION</th>
            </tr>
          </thead>
          <tbody>
            {course.trainees.map((trainee, index) => (
              <tr
                key={trainee._id}
                className="text-left border-b-[1px] border-gray-600"
              >
                <td className="font-normal text-xs sm:text-base">
                  {index + 1}
                </td>
                <td className="text-xs whitespace-nowrap sm:text-base font-normal">
                  {trainee.rank} {trainee.formattedFullName}
                </td>
                {!isTrainee && isInstructorOfCourse && (
                  <td>
                    {trainee._id === courseIcId ? (
                      <div className="flex items-center">
                        <kbd className="kbd kbd-sm bg-success text-black border-black border-2 p-1 font-bold">
                          IC
                        </kbd>
                        <span className="text-success text-2xl pl-2">
                          <FaPersonMilitaryPointing />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <kbd
                          onClick={() =>
                            handleAssignIC(
                              trainee._id,
                              course._id,
                              "courseIC",
                              trainee.formattedFullName
                            )
                          }
                          className="text-blue-300 cursor-pointer text-xs sm:text-sm"
                        >
                          Appoint
                        </kbd>
                        <button
                          onClick={() =>
                            handleAssignIC(
                              trainee._id,
                              course._id,
                              "courseIC",
                              trainee.formattedFullName
                            )
                          }
                          disabled={trainee._id === course.courseIC}
                          className="pl-2"
                        >
                          <LiaHandPointLeftSolid className="text-gray-400 text-2xl" />
                        </button>
                      </div>
                    )}
                  </td>
                )}
                {!isTrainee && isInstructorOfCourse && (
                  <td>
                    {trainee._id === weaponStoreIcId ? (
                      <div className="flex items-center text-center">
                        <kbd className="kbd kbd-sm bg-error text-black border-black border-2 p-1 font-bold text-center">
                          IC
                        </kbd>
                        <span className="text-error text-2xl pl-2">
                          <FaPersonMilitaryRifle />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <kbd
                          onClick={() =>
                            handleAssignIC(
                              trainee._id,
                              course._id,
                              "weaponStoreIC",
                              trainee.formattedFullName
                            )
                          }
                          className="text-blue-300 cursor-pointer text-xs sm:text-sm"
                        >
                          Appoint
                        </kbd>
                        <button
                          onClick={() =>
                            handleAssignIC(
                              trainee._id,
                              course._id,
                              "weaponStoreIC",
                              trainee.formattedFullName
                            )
                          }
                          disabled={trainee._id === course.weaponStoreIC}
                          className="pl-2"
                        >
                          <LiaHandPointLeftSolid className="text-gray-400 text-2xl" />
                        </button>
                      </div>
                    )}
                  </td>
                )}
                <td>
                  {isTrainee && trainee._id === user._id ? (
                    <div className="flex items-center">
                      <StatusBadge trainee={trainee} />
                      <button
                        className="min-w-[8%] bg-[#7299f2] sm:py-1.5 px-2 py-1 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center absolute -top-1 left-7"
                        onClick={() => handleEditStatus(trainee)}
                      >
                        <FiEdit className="pr-1 md:text-xl text-lg" />
                        <span className="sm:text-sm text-xs sm:flex sm:items-center sm:justify-center">
                          <span className="hidden sm:block sm:mr-1">Edit </span>
                          Status
                        </span>
                      </button>
                    </div>
                  ) : (
                    <StatusBadge trainee={trainee} />
                  )}
                </td>

                <td>
                  {isTrainee && trainee._id === user._id ? (
                    <div className="flex items-center">
                      {trainee.status[0]?.status === "Present" ||
                      trainee.status[0]?.status === "Light Duty" ? (
                        <>
                          <span className="w-3/4 text-center rounded-md badge bg-[#4D3E3E] p-4 py-5 text-[#FCF9ED] text-xs md:text-base font-normal">
                            {trainee.status[0]?.location}
                          </span>
                          <button
                            className="min-w-[8%] bg-[#7299f2] sm:py-1.5 px-2 py-1 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center absolute -top-1 sm:left-[11.5%] left-[30%]"
                            onClick={() => handleEditLocation(trainee)}
                          >
                            <FiEdit className="pr-1 md:text-xl text-lg" />
                            <span className="sm:text-sm text-xs sm:flex sm:items-center sm:justify-center">
                              <span className="hidden sm:block sm:mr-1">
                                Edit{" "}
                              </span>
                              Location
                            </span>
                          </button>
                        </>
                      ) : (
                        <span className="w-3/4 text-center rounded-md badge bg-[#374045] p-4 py-5 text-xs md:text-base font-normal">
                          Not Present
                        </span>
                      )}
                    </div>
                  ) : trainee.status[0]?.status === "Present" ||
                    trainee.status[0]?.status === "Light Duty" ? (
                    <span className="w-3/4 text-center rounded-md badge bg-[#4D3E3E] p-4 py-5 text-[#FCF9ED] text-xs md:text-base font-normal">
                      {trainee.status[0]?.location}
                    </span>
                  ) : (
                    <span className="w-3/4 text-center rounded-md badge bg-[#374045] p-4 py-5 text-xs md:text-base font-normal">
                      Not Present
                    </span>
                  )}
                </td>
                {!isTrainee && isInstructorOfCourse && (
                  <td>
                    <TraineeDeleteButton
                      handleDeleteTrainee={handleDeleteTrainee}
                      trainee={trainee}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
