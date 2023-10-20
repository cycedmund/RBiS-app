import InstructorDashboard from "../components/dashboard/InstructorDashboard/InstructorDashboard";
import TraineeDashboard from "../components/dashboard/TraineeDashboard/TraineeDashboard";
import LoginForm from "../components/users/Forms/Login/LoginForm";
import SignupForm from "../components/users/Forms/SignUp/SignUpForm";

const traineesRoutes = [
  {
    path: "/dashboard/trainees/:traineeID",
    element: <TraineeDashboard />,
  },
  // {
  //   path: "/dashboard/equipment/trainees",
  //   element: <TraineeEquipment />,
  // },
  // {
  //   path: "/dashboard/equipment/:id",
  //   element: <EquipmentDetails />,
  // },
];

const instructorRoutes = [
  {
    path: "/dashboard/course",
    element: <InstructorDashboard />,
  },
  // {
  //   path: "/dashboard/equipment",
  //   element: <InstructorEquipment />,
  // },
  // {
  //   path: "/dashboard/equipment/:id",
  //   element: <EquipmentDetails />,
  // },
  // {
  //   path: "/dashboard/equipment/:id/add",
  //   element: <AddEquipment />,
  // },
  // {
  //   path: "/dashboard/equipment/:id/edit",
  //   element: <EditEquipment />,
  // },
];

const authRoutes = [
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/signup/trainees", // Add hashed if needed
    element: <SignupForm />,
  },
  {
    path: "/signup/instructor",
    element: <SignupForm />,
  },
];

export { traineesRoutes, instructorRoutes, authRoutes };
