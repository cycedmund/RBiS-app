import { useAtom } from "jotai";
import { Routes, Route } from "react-router-dom";
import InstructorDashboard from "../../components/dashboard/InstructorDashboard/InstructorDashboard";
import TraineeDashboard from "../../components/dashboard/TraineeDashboard/TraineeDashboard";
import { userAtom } from "../../utilities/atom-jotai/atom";
import EquipmentDashboardPage from "../Equipment/EquipmentDashboardPage";

const DashboardPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      {user.role === "trainee" && (
        <Routes>
          <Route path="/trainee" element={<TraineeDashboard />} />
          <Route path="/equipment" element={<EquipmentDashboardPage />} />
        </Routes>
      )}
      {(user.role === "admin" || user.role === "instructor") && (
        <Routes>
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/equipment" element={<EquipmentDashboardPage />} />
        </Routes>
      )}
    </div>
  );
};

export default DashboardPage;
