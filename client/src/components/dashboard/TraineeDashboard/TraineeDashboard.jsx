import { useAtom } from "jotai";
import _ from "lodash";
import { selectedCourseAtom } from "../../../utilities/atom-jotai/atom";
import Divider from "../../common/Divider/Divider";
import Loading from "../../common/Loading/Loading";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardTable from "../DashboardTable/DashboardTable";

const TraineeDashboard = () => {
  const [selectedCourse] = useAtom(selectedCourseAtom);

  if (_.isEmpty(selectedCourse)) {
    return <Loading />;
  }
  return (
    <div>
      {/* <header>{selectedCourse && selectedCourse.course}</header> */}
      {selectedCourse && <DashboardStats selectedCourse={selectedCourse} />}
      <Divider />
      {selectedCourse && (
        <DashboardTable
          key={selectedCourse._id}
          course={selectedCourse}
          // setSelectedCourse={setSelectedCourse}
        />
      )}
    </div>
  );
};

export default TraineeDashboard;
