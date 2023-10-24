import Swal from "sweetalert2";
import { updateTraineeStatusService } from "../../../utilities/users/users-service";

export const statusToAll = async (
  selectedStatus,
  course,
  setSelectedCourse
) => {
  try {
    const updatedTraineesData = await Promise.all(
      course.trainees.map(async (trainee) => {
        const body = {
          status: selectedStatus,
          location: trainee.status[0].location,
          description: trainee.status[0].description,
        };

        const response = await updateTraineeStatusService(trainee._id, body);
        const { status, data } = response;

        if (status === "success") {
          return data;
        }
      })
    );

    const updatedTrainees = updatedTraineesData.map((arr) => arr.trainee);
    const totalPresent = updatedTraineesData.map((arr) => arr.totalPresent);
    const commonLocation = updatedTraineesData.map((arr) => arr.commonLocation);

    setSelectedCourse((prevCourse) => ({
      ...prevCourse,
      trainees: updatedTrainees,
      totalPresent: totalPresent[0],
      commonLocation: commonLocation[0],
    }));

    Swal.fire("Status Updated", "Status updated for all trainees", "success");

    // return true;
  } catch (err) {
    console.error("Error updating status:", err);
    Swal.fire("Error", "An error occurred while updating status.", "error");
    // return false;
  }
};

export const locationToAll = async (
  selectedLocation,
  course,
  setSelectedCourse
) => {
  try {
    const updatedTraineesData = await Promise.all(
      course.trainees.map(async (trainee) => {
        const body = {
          status: trainee.status[0].status,
          location: selectedLocation,
          description: trainee.status[0].description,
        };

        const response = await updateTraineeStatusService(trainee._id, body);
        const { status, data } = response;

        if (status === "success") {
          return data;
        }
      })
    );

    const updatedTrainees = updatedTraineesData.map((arr) => arr.trainee);
    const totalPresent = updatedTraineesData.map((arr) => arr.totalPresent);
    const commonLocation = updatedTraineesData.map((arr) => arr.commonLocation);

    setSelectedCourse((prevCourse) => ({
      ...prevCourse,
      trainees: updatedTrainees,
      totalPresent: totalPresent[0],
      commonLocation: commonLocation[0],
    }));

    Swal.fire("Status Updated", "Status updated for all trainees", "success");

    // return true;
  } catch (err) {
    console.error("Error updating status:", err);
    Swal.fire("Error", "An error occurred while updating status.", "error");
    // return false;
  }
};
