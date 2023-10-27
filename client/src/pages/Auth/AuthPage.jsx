import { Route, Routes } from "react-router-dom";
import LoginForm from "../../components/users/Forms/Login/LoginForm";
import SignupForm from "../../components/users/Forms/SignUp/SignUpForm";

const AuthPage = () => {
  return (
    <div>
      {/* <Outlet /> */}
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup/:role" element={<SignupForm />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
