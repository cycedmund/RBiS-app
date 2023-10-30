import Swal from "sweetalert2";
import { errorSwal } from "../../../utilities/swal/errorSwal";
import { swalSettings } from "../../../utilities/swal/swalSettings";
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

      Swal.fire(swalSettings("Status updated", "success"));

      // return true;
    }
  } catch (err) {
    console.error("Error updating status:", err);
    errorSwal(err);
    // return false;
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

      Swal.fire(swalSettings("Location updated", "success"));

      // return true;
    }
  } catch (err) {
    console.error("Error updating location:", err);
    errorSwal(err);
    // return false;
  }
};
