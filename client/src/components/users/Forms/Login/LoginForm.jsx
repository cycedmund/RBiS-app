import { useForm } from "react-hook-form";
import { getHours } from "date-fns";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../utilities/yup/yup-schema";
import { loginService } from "../../../../utilities/users/users-service";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { setUserAtom } from "../../../../utilities/atom-jotai/atom";
import Swal from "sweetalert2";
import { swalSettings } from "../../../../utilities/swal/swalSettings";
import { errorSwal } from "../../../../utilities/swal/errorSwal";
import PasswordVisibilityButton from "../../../common/PasswordVisibilityButton/PasswordVisibilityButton";
import { useState } from "react";
import SidebarLoading from "../../../common/Loading/SidebarLoading";

const LoginForm = ({ visibility, handlePasswordVisibility }) => {
  const [status, setStatus] = useState(null);
  const [, setUser] = useAtom(setUserAtom);
  const navigate = useNavigate();

  const currentTime = new Date();
  const currentHour = getHours(currentTime);

  let message;
  if (currentHour >= 0 && currentHour < 12) {
    message = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const user = await loginService(data);
      if (user !== null && user !== undefined) {
        const prompt = await Swal.fire({
          ...swalSettings(`${message}!`, "success"),
          text: `Hello, ${user.rank} ${user.formattedFullName}!`,
          confirmButtonText: "Enter",
          allowOutsideClick: false,
        });
        if (prompt.isConfirmed) {
          setUser(user);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      errorSwal(err);
    }
    reset();
    setStatus(null);
  };

  return (
    <>
      <section className="bg-[#202029] min-h-screen flex flex-col justify-center items-center">
        <main className="w-[300px] sm:min-w-[25%] sm:max-w-[25%] bg-[#1c1c24] p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl text-white mb-6 font-raleway font-semibold">
            Log In
          </h1>
          <form
            className="mt-8"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-raleway font-medium text-gray-200"
              >
                Username
              </label>
              <input
                id="username"
                {...register("username")}
                placeholder="Username"
                className="mt-1 w-full rounded-xs text-sm shadow-sm border-gray-700 bg-[#2a2a36] text-gray-200 p-2 font-raleway placeholder:text-gray-600"
              />
              <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => (
                  <p className="text-red-400 text-xs font-raleway mt-1">
                    {message}
                  </p>
                )}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="Password"
                className="block text-sm font-raleway font-medium text-gray-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={visibility ? "text" : "password"}
                  autoComplete="off"
                  {...register("password")}
                  placeholder="Password (case-sensitive)"
                  id="Password"
                  className="mt-1 w-full rounded-xs text-sm shadow-sm border-gray-700 bg-[#2a2a36] text-gray-200 p-2 font-raleway placeholder:text-gray-600"
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-red-400 font-raleway text-xs mt-1">
                      {message}
                    </p>
                  )}
                />
                <PasswordVisibilityButton
                  visibility={visibility}
                  handlePasswordVisibility={handlePasswordVisibility}
                />
              </div>
            </div>

            <div className="sm:flex sm:flex-col sm:items-center sm:gap-4 mt-6">
              <button
                type="submit"
                className="w-full inline-block shrink-0 rounded-none border border-[#7299f2] bg-[#7299f2] px-12 py-2 text-md font-semibold text-black transition  focus:outline-none focus:ring hover:bg-[#4975d9] font-raleway"
              >
                {status === "loading" ? <SidebarLoading /> : "Log In"}
              </button>
            </div>
            <p className="mt-4 font-raleway text-sm">
              {" "}
              <span className="mr-1">New to RBiS?</span>
              <Link
                to="/signup/trainee"
                className="text-stone-500 hover:text-[#7299f2]"
              >
                Sign up now!
              </Link>{" "}
            </p>
          </form>
        </main>
      </section>
    </>
  );
};

export default LoginForm;
