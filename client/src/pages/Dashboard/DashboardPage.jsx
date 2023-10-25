import { useAtom } from "jotai";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import InstructorDashboard from "../../components/dashboard/InstructorDashboard/InstructorDashboard";
import TraineeDashboard from "../../components/dashboard/TraineeDashboard/TraineeDashboard";
import { setEquipmentAtom, userAtom } from "../../utilities/atom-jotai/atom";
import { getAllEquipmentService } from "../../utilities/equipment/equipment-service";
import EquipmentDashboardPage from "../Equipment/EquipmentDashboardPage";
import EquipmentUnitDashboard from "../EquipmentUnit/EquipmentUnitDashboard";

const DashboardPage = () => {
  const [user] = useAtom(userAtom);
  const [, setEquipment] = useAtom(setEquipmentAtom);

  useEffect(() => {
    const fetchAllEquipment = async () => {
      const allEquipment = await getAllEquipmentService();
      console.log(allEquipment);
      setEquipment(allEquipment);
    };
    fetchAllEquipment();
  }, [setEquipment]);

  return (
    <div>
      {user.role === "trainee" && (
        <Routes>
          <Route path="/trainee" element={<TraineeDashboard />} />
          <Route path="/equipment" element={<EquipmentDashboardPage />} />
          <Route
            path="/equipment/:category"
            element={<EquipmentUnitDashboard />}
          />
        </Routes>
      )}
      {(user.role === "admin" || user.role === "instructor") && (
        <Routes>
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/equipment" element={<EquipmentDashboardPage />} />
          <Route
            path="/equipment/:category"
            element={<EquipmentUnitDashboard />}
          />
        </Routes>
      )}
    </div>
  );
};

export default DashboardPage;
