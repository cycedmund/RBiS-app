import { useAtom } from "jotai";
import { userAtom } from "../../../utilities/atom-jotai/atom";
import {
  statusOptions,
  locationOptions,
  customStyles,
} from "../../../utilities/react-select/settings";
import Select from "react-select";
import { useState } from "react";

const DashboardTable = ({
  course,
  handleAssignIC,
  handleStatusChange,
  handleApplyAllStatus,
  applyAllStatus,
  handleApplyAllLocation,
  applyAllLocation,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [user] = useAtom(userAtom);
  const weaponStoreIcId = course.weaponStoreIC?._id || null;
  const courseIcId = course.courseIC?._id || null;
  const isTrainee = user.role === "trainee";

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>S/No.</th>
            <th>Name</th>
            {!isTrainee && <th>Course IC</th>}
            {!isTrainee && <th>Weapon Store IC</th>}
            {isTrainee && user._id === courseIcId ? (
              <th>
                Status
                <input
                  type="checkbox"
                  checked={applyAllStatus}
                  className="checkbox checkbox-sm"
                  onChange={handleApplyAllStatus}
                />
              </th>
            ) : (
              <th>Status</th>
            )}
            {isTrainee && user._id === courseIcId ? (
              <th>
                Location
                <input
                  type="checkbox"
                  checked={applyAllLocation}
                  className="checkbox checkbox-sm"
                  onChange={handleApplyAllLocation}
                />
              </th>
            ) : (
              <th>Location</th>
            )}
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
                  <Select
                    options={statusOptions}
                    styles={customStyles}
                    value={
                      applyAllStatus
                        ? {
                            value: selectedStatus,
                            label: selectedStatus,
                          }
                        : {
                            value: trainee.status[0].status,
                            label: trainee.status[0].status,
                          }
                    }
                    isOptionDisabled={(option) =>
                      (option.value === trainee.status[0].status &&
                        !applyAllStatus) ||
                      (option.value === selectedStatus && applyAllStatus)
                    }
                    onChange={(selected) => {
                      setSelectedStatus(selected.value);
                      handleStatusChange(
                        trainee._id,
                        selected.value,
                        trainee?.status[0]?.location,
                        trainee?.status[0]?.description
                      );
                    }}
                  />
                ) : user._id === courseIcId ? (
                  <Select
                    options={statusOptions}
                    styles={customStyles}
                    value={
                      applyAllStatus
                        ? {
                            value: selectedStatus,
                            label: selectedStatus,
                          }
                        : {
                            value: trainee.status[0].status,
                            label: trainee.status[0].status,
                          }
                    }
                    isOptionDisabled={(option) =>
                      (option.value === trainee.status[0].status &&
                        !applyAllStatus) ||
                      (option.value === selectedStatus && applyAllStatus)
                    }
                    onChange={(selected) => {
                      setSelectedStatus(selected.value);
                      handleStatusChange(
                        trainee._id,
                        selected.value,
                        trainee?.status[0]?.location,
                        trainee?.status[0]?.description
                      );
                    }}
                  />
                ) : (
                  trainee.status[0].status
                )}
              </td>

              <td>
                {isTrainee && trainee._id === user._id ? (
                  <Select
                    options={locationOptions}
                    styles={customStyles}
                    value={
                      applyAllLocation
                        ? { value: selectedLocation, label: selectedLocation }
                        : {
                            value: trainee.status[0].location,
                            label: trainee.status[0].location,
                          }
                    }
                    isOptionDisabled={(option) =>
                      (option.value === trainee.status[0].location &&
                        !applyAllStatus) ||
                      (option.value === selectedStatus && applyAllLocation)
                    }
                    onChange={(selected) => {
                      setSelectedLocation(selected.value);
                      handleStatusChange(
                        trainee._id,
                        trainee?.status[0]?.status,
                        selected.value,
                        trainee?.status[0]?.description
                      );
                    }}
                  />
                ) : user._id === courseIcId ? (
                  <Select
                    options={locationOptions}
                    styles={customStyles}
                    value={
                      applyAllLocation
                        ? { value: selectedLocation, label: selectedLocation }
                        : {
                            value: trainee.status[0].location,
                            label: trainee.status[0].location,
                          }
                    }
                    isOptionDisabled={(option) =>
                      (option.value === trainee.status[0].location &&
                        !applyAllStatus) ||
                      (option.value === selectedStatus && applyAllLocation)
                    }
                    onChange={(selected) => {
                      setSelectedLocation(selected.value);
                      handleStatusChange(
                        trainee._id,
                        trainee?.status[0]?.status,
                        selected.value,
                        trainee?.status[0]?.description
                      );
                    }}
                  />
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
