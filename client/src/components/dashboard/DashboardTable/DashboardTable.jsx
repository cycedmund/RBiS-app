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
        const { isConfirmed: applyAll } = await await applyAllSwal();

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
    <div className="overflow-x-auto min-w-screen">
      <table className="w-full table-lg lg:table-lg md:table-md sm:table-sm">
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAME</th>
            {!isTrainee && <th>COURSE IC</th>}
            {!isTrainee && <th>WPN STORE IC</th>}
            <th>STATUS</th>
            <th>LOCATION</th>
          </tr>
        </thead>
        <tbody>
          {course?.trainees.map((trainee, index) => (
            <tr key={trainee._id}>
              <th>{index + 1}</th>
              <td>{trainee.formattedFullName}</td>
              {!isTrainee && (
                <td>
                  {trainee._id === courseIcId ? (
                    "IC"
                  ) : (
                    <button
                      onClick={() =>
                        handleAssignIC(trainee._id, course._id, "courseIC")
                      }
                      disabled={trainee._id === course.courseIC}
                    >
                      Appoint
                    </button>
                  )}
                </td>
              )}
              {!isTrainee && (
                <td>
                  {trainee._id === weaponStoreIcId ? (
                    "IC"
                  ) : (
                    <button
                      onClick={() =>
                        handleAssignIC(trainee._id, course._id, "weaponStoreIC")
                      }
                      disabled={trainee._id === course.weaponStoreIcId}
                    >
                      Appoint
                    </button>
                  )}
                </td>
              )}
              <td>
                {isTrainee && trainee._id === user._id ? (
                  <div className="flex items-center">
                    {trainee.status[0].status}
                    <button onClick={() => handleEditStatus(trainee)}>
                      Edit
                    </button>
                  </div>
                ) : user._id === courseIcId ? (
                  <div className="flex items-center">
                    {trainee.status[0].status}
                    <button onClick={() => handleEditStatus(trainee)}>
                      Edit
                    </button>
                  </div>
                ) : (
                  trainee.status[0].status
                )}
              </td>

              <td>
                {isTrainee && trainee._id === user._id ? (
                  <div className="flex items-center">
                    {trainee.status[0].location}
                    <button onClick={() => handleEditLocation(trainee)}>
                      Edit
                    </button>
                  </div>
                ) : user._id === courseIcId ? (
                  <div className="flex items-center">
                    {trainee.status[0].location}
                    <button onClick={() => handleEditLocation(trainee)}>
                      Edit
                    </button>
                  </div>
                ) : (
                  trainee.status[0].location
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
