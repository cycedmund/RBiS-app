import { useAtom } from "jotai";
import InstructorDashboard from "../../components/dashboard/InstructorDashboard/InstructorDashboard";
import TraineeDashboard from "../../components/dashboard/TraineeDashboard/TraineeDashboard";
import { userAtom } from "../../utilities/atom-jotai/atom";

const DashboardPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      {user.role === "trainee" && <TraineeDashboard />}
      {(user.role === "admin" || user.role === "instructor") && (
        <InstructorDashboard />
      )}
    </div>
  );
};

export default DashboardPage;
