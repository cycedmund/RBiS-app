import { useEffect, useState } from "react";
import { getTraineeCourseService } from "../../../utilities/courses/courses-service";
import { updateTraineeStatusService } from "../../../utilities/users/users-service";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardTable from "../DashboardTable/DashboardTable";

const TraineeDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [applyAllStatus, setApplyAllStatus] = useState(false);
  const [applyAllLocation, setApplyAllLocation] = useState(false);

  useEffect(() => {
    const fetchTraineeCourse = async () => {
      const traineeCourse = await getTraineeCourseService();
      setSelectedCourse(traineeCourse.courses[0]);
    };

    fetchTraineeCourse();
  }, []);

  const handleApplyAllStatus = () => {
    setApplyAllStatus((prev) => !prev);
  };
  const handleApplyAllLocation = () => {
    setApplyAllLocation((prev) => !prev);
  };

  const handleStatusChange = async (
    traineeID,
    newStatus,
    location,
    description
  ) => {
    if (applyAllStatus || applyAllLocation) {
      const updatedTrainees = await Promise.all(
        selectedCourse.trainees.map(async (trainee) => {
          try {
            const body = {
              status: newStatus,
              location: location,
              description: description,
            };
            const response = await updateTraineeStatusService(
              trainee._id,
              body
            );
            const { status, data } = response;
            if (status === "success") {
              return data;
            }
          } catch (err) {
            console.error("Error updating status:", err);
            return trainee;
          }
        })
      );
      const trainees = updatedTrainees.map((arr) => arr.trainee);
      const totalPresent = updatedTrainees.map((arr) => arr.totalPresent);
      const commonLocation = updatedTrainees.map((arr) => arr.commonLocation);
      setSelectedCourse((prevCourse) => {
        return {
          ...prevCourse,
          trainees: trainees,
          totalPresent: totalPresent[0],
          commonLocation: commonLocation[0],
        };
      });
    } else {
      try {
        const body = {
          status: newStatus,
          location: location,
          description: description,
        };
        const response = await updateTraineeStatusService(traineeID, body);
        const { status, data } = response;
        if (status === "success") {
          const updatedCourse = {
            ...selectedCourse,
            trainees: selectedCourse.trainees.map((trainee) =>
              trainee._id === traineeID ? data.trainee : trainee
            ),
            totalPresent: data.totalPresent,
          };
          setSelectedCourse(updatedCourse);
        }
      } catch (err) {
        console.error("Error updating status:", err);
      }
    }
  };

  return (
    <div>
      <header>{selectedCourse && selectedCourse.course}</header>
      {selectedCourse && <DashboardStats selectedCourse={selectedCourse} />}
      <div className="divider divider-vertical"></div>

      {selectedCourse && (
        <DashboardTable
          key={selectedCourse._id}
          course={selectedCourse}
          handleStatusChange={handleStatusChange}
          handleApplyAllStatus={handleApplyAllStatus}
          handleApplyAllLocation={handleApplyAllLocation}
          applyAllStatus={applyAllStatus}
          applyAllLocation={applyAllLocation}
        />
      )}
    </div>
  );
};

export default TraineeDashboard;
