import { useEffect, useState } from "react";
import { getTraineeCourseService } from "../../../utilities/courses/courses-service";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardTable from "../DashboardTable/DashboardTable";

const TraineeDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchTraineeCourse = async () => {
      const traineeCourse = await getTraineeCourseService();
      setSelectedCourse(traineeCourse.courses[0]);
    };

    fetchTraineeCourse();
  }, []);

  return (
    <div>
      {/* <header>{selectedCourse && selectedCourse.course}</header> */}
      {selectedCourse && <DashboardStats selectedCourse={selectedCourse} />}
      <div className="divider divider-vertical px-6"></div>

      {selectedCourse && (
        <DashboardTable
          key={selectedCourse._id}
          course={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}
    </div>
  );
};

export default TraineeDashboard;
