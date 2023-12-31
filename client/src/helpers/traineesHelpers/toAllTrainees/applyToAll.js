import Swal from "sweetalert2";
import { errorSwal } from "../../../utilities/swal/errorSwal";
import { swalSettings } from "../../../utilities/swal/swalSettings";
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
    Swal.fire({
      ...swalSettings("Status updated", "success"),
      text: "Status updated for all trainees",
    });

    // return true;
  } catch (err) {
    errorSwal(err);
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

    Swal.fire({
      ...swalSettings("Location updated", "success"),
      text: "Location updated for all trainees",
    });

    // return true;
  } catch (err) {
    console.error("Error updating status:", err);
    errorSwal(err);
    // return false;
  }
};
