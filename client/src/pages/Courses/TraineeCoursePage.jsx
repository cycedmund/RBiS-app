import { useAtom } from "jotai";
import _ from "lodash";
import { selectedCourseAtom } from "../../utilities/atom-jotai/atom";
import Divider from "../../components/common/Divider/Divider";
import Loading from "../../components/common/Loading/Loading";
import CourseStats from "../../components/courses/CourseStats/CourseStats";
import CourseTable from "../../components/courses/CourseTable/CourseTable";

const TraineeCoursePage = () => {
  const [selectedCourse] = useAtom(selectedCourseAtom);

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }
  return (
    <div>
      {selectedCourse && <CourseStats selectedCourse={selectedCourse} />}
      <Divider />
      {selectedCourse && (
        <CourseTable key={selectedCourse._id} course={selectedCourse} />
      )}
    </div>
  );
};

export default TraineeCoursePage;
