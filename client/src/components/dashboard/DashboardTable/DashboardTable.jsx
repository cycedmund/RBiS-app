import { useAtom } from "jotai";
import { userAtom } from "../../../utilities/atom-jotai/atom";
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

const DashboardTable = ({ course, handleAssignIC, setSelectedCourse }) => {
  const [user] = useAtom(userAtom);
  const weaponStoreIcId = course.weaponStoreIC?._id || null;
  const courseIcId = course.courseIC?._id || null;
  const isTrainee = user.role === "trainee";

  const handleEditStatus = async (trainee) => {
    const isCourseIC = user._id === courseIcId;
    const { value: selectedStatus } = await statusSwal(trainee);

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
    const { value: selectedLocation } = await locationSwal(trainee);

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
      <div className="max-w-[calc(100vw-2rem)] overflow-x-auto min-w-full font-roboto font-medium">
        <table className="w-full table-md lg:table-lg md:table-md sm:table-sm">
          <thead>
            <tr className="text-left">
              <th className="font-semibold">S/N</th>
              <th className="font-semibold">NAME</th>
              {!isTrainee && <th className="font-semibold">COURSE IC</th>}
              {!isTrainee && <th className="font-semibold">STORE IC</th>}
              <th className="font-semibold">STATUS</th>
              <th className="font-semibold">LOCATION</th>
            </tr>
          </thead>
          <tbody>
            {course?.trainees.map((trainee, index) => (
              <tr
                key={trainee._id}
                className="text-left border-b-[1px] border-gray-600"
              >
                <th className="text-lg font-normal">{index + 1}</th>
                <td className="w-1/4">
                  {trainee.rank} {trainee.formattedFullName}
                </td>
                {!isTrainee && (
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
                            handleAssignIC(trainee._id, course._id, "courseIC")
                          }
                          className="text-blue-300 cursor-pointer"
                        >
                          Appoint
                        </kbd>
                        <button
                          onClick={() =>
                            handleAssignIC(trainee._id, course._id, "courseIC")
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
                {!isTrainee && (
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
                              "weaponStoreIC"
                            )
                          }
                          className="text-blue-300 cursor-pointer"
                        >
                          Appoint
                        </kbd>
                        <button
                          onClick={() =>
                            handleAssignIC(
                              trainee._id,
                              course._id,
                              "weaponStoreIC"
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
                <td className="w-1/4">
                  {isTrainee && trainee._id === user._id ? (
                    <div className="flex items-center">
                      <StatusBadge trainee={trainee} />
                      <button
                        className="min-w-[12%] bg-[#7299f2] px-2 py-1 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center absolute -top-1 left-7"
                        onClick={() => handleEditStatus(trainee)}
                      >
                        <FiEdit className="pr-2 text-2xl" />
                        <span className="hidden sm:block">Edit Status</span>
                      </button>
                    </div>
                  ) : (
                    <StatusBadge trainee={trainee} />
                  )}
                </td>

                <td className="w-1/4">
                  {isTrainee && trainee._id === user._id ? (
                    <div className="flex items-center">
                      {trainee.status[0]?.status === "Present" ||
                      trainee.status[0]?.status === "Light Duty" ? (
                        <>
                          <span className="w-3/4 text-center badge badge-outline p-4 py-5">
                            {trainee.status[0]?.location}
                          </span>
                          <button
                            className="min-w-[12%] bg-[#7299f2] px-2 py-1 text-black font-roboto font-normal text-sm rounded-sm flex items-center justify-center absolute -top-1 md:left-[16%] left-[19%]"
                            onClick={() => handleEditLocation(trainee)}
                          >
                            <FiEdit className="pr-2 text-2xl" />
                            <span className="hidden sm:block">
                              Edit Location
                            </span>
                          </button>
                        </>
                      ) : (
                        <span className="w-3/4 text-center badge badge-outline p-4 py-5 text-red-400">
                          Trainee Not Present
                        </span>
                      )}
                    </div>
                  ) : trainee.status[0]?.status === "Present" ||
                    trainee.status[0]?.status === "Light Duty" ? (
                    <span className="w-3/4 text-center badge badge-outline p-4 py-5">
                      {trainee.status[0]?.location}
                    </span>
                  ) : (
                    <span className="w-3/4 text-center badge badge-outline p-4 py-5">
                      Trainee Not Present
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
