import Swal from "sweetalert2";
import { updateTraineeStatusService } from "../../../utilities/users/users-service";

export const statusToOne = async (
  selectedStatus,
  trainee,
  course,
  setSelectedCourse
) => {
  try {
    const body = {
      status: selectedStatus,
      location: trainee.status[0].location,
      description: trainee.status[0].description,
    };

    const response = await updateTraineeStatusService(trainee._id, body);
    const { status, data } = response;

    if (status === "success") {
      const updatedCourse = {
        ...course,
        trainees: course.trainees.map((t) =>
          t._id === trainee._id ? data.trainee : t
        ),
        totalPresent: data.totalPresent,
      };
      setSelectedCourse(updatedCourse);

      Swal.fire("Status Updated", "", "success");

      // return true;
    } else {
      Swal.fire("Error", "An error occurred while updating status.", "error");
      // return false;
    }
  } catch (err) {
    console.error("Error updating status:", err);
    Swal.fire("Error", "An error occurred while updating status.", "error");
    return false;
  }
};

export const locationToOne = async (
  selectedLocation,
  trainee,
  course,
  setSelectedCourse
) => {
  try {
    const body = {
      status: trainee.status[0].status,
      location: selectedLocation,
      description: trainee.status[0].description,
    };

    const response = await updateTraineeStatusService(trainee._id, body);
    const { status, data } = response;

    if (status === "success") {
      const updatedCourse = {
        ...course,
        trainees: course.trainees.map((t) =>
          t._id === trainee._id ? data.trainee : t
        ),
        totalPresent: data.totalPresent,
      };
      setSelectedCourse(updatedCourse);

      Swal.fire("Status Updated", "", "success");

      // return true;
    } else {
      Swal.fire("Error", "An error occurred while updating status.", "error");
      // return false;
    }
  } catch (err) {
    console.error("Error updating status:", err);
    Swal.fire("Error", "An error occurred while updating status.", "error");
    return false;
  }
};
