import { Routes, Route } from "react-router-dom";
import LoginForm from "../../components/users/Forms/Login/LoginForm";
import SignupForm from "../../components/users/Forms/SignUp/SignUpForm";
import DashboardPage from "../Dashboard/DashboardPage";
import AuthPage from "../Auth/AuthPage";
import { userAtom } from "../../utilities/atom-jotai/atom";
import { useAtom } from "jotai";
import NavBar from "../../components/common/NavBar/NavBar";

const App = () => {
  const [user] = useAtom(userAtom);

  return (
    <div className="flex h-screen bg-zinc-900">
      {user && <NavBar />}
      <div className="flex-grow flex flex-col">
        <Routes>
          {user ? (
            <Route path="/dashboard" element={<DashboardPage />} />
          ) : (
            <Route path="/" element={<AuthPage />}>
              <Route path="login" element={<LoginForm />} />
              <Route path="signup" element={<SignupForm />} />
            </Route>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
