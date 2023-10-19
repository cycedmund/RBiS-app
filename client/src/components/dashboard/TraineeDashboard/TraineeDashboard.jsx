import { useEffect, useState } from "react";
import { getTraineeCourseService } from "../../../utilities/courses/courses-service";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardTable from "../DashboardTable/DashboardTable";

const TraineeDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchTraineeCourse = async () => {
      const traineeCourse = await getTraineeCourseService();
      console.log(traineeCourse.courses);
      setSelectedCourse(traineeCourse.courses[0]);
    };

    fetchTraineeCourse();
  }, []);

  // const handleClick = (course) => {
  //   setSelectedCourse(course);
  // };

  // const handleAssignIC = async (traineeID, courseID) => {
  //   try {
  //     const response = await assignICService(traineeID, courseID);
  //     const { status, data } = response;
  //     if (status === "success") {
  //       const updateWpnStoreIC = courses.map((course) => {
  //         if (course._id === courseID) {
  //           return {
  //             ...data.course,
  //           };
  //         }
  //         return course;
  //       });
  //       setCourses(updateWpnStoreIC);
  //       const updatedCourse = updateWpnStoreIC.find(
  //         (course) => course._id === courseID
  //       );
  //       setSelectedCourse(updatedCourse);
  //     }
  //   } catch (err) {
  //     console.error("Error assigning IC", err);
  //   }
  // };

  return (
    <div>
      <header>{selectedCourse && selectedCourse.course}</header>
      {selectedCourse && <DashboardStats selectedCourse={selectedCourse} />}
      <div className="divider divider-vertical"></div>

      {selectedCourse && (
        <DashboardTable
          key={selectedCourse._id}
          course={selectedCourse}
          // handleAssignIC={handleAssignIC}
        />
      )}
    </div>
  );
};

export default TraineeDashboard;
