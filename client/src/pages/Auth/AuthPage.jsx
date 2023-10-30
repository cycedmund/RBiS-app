import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../../components/users/Forms/Login/LoginForm";
import SignupForm from "../../components/users/Forms/SignUp/SignUpForm";

const AuthPage = () => {
  const [visibility, setVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <div>
      {/* <Outlet /> */}
      <Routes>
        <Route
          path="login"
          element={
            <LoginForm
              visibility={visibility}
              handlePasswordVisibility={handlePasswordVisibility}
            />
          }
        />
        <Route
          path="signup/:role"
          element={
            <SignupForm
              visibility={visibility}
              handlePasswordVisibility={handlePasswordVisibility}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AuthPage;
