import { Link, useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../../utilities/yup/yup-schema";
import { signUpService } from "../../../../utilities/users/users-service";
import { useAtom } from "jotai";
import { setUserAtom } from "../../../../utilities/atom-jotai/atom";
import { swalSettings } from "../../../../utilities/swal/swalSettings";
import Swal from "sweetalert2";
import { errorSwal } from "../../../../utilities/swal/errorSwal";
import PasswordVisibilityButton from "../../../common/PasswordVisibilityButton/PasswordVisibilityButton";

// loop through options
// use Intl.english to auto generate course every 3months?

const SignupForm = ({ visibility, handlePasswordVisibility }) => {
  // const [showCourse, setShowCourse] = useState(true);
  const { role } = useParams();
  const [, setUser] = useAtom(setUserAtom);
  const navigate = useNavigate();

  const defaultValues = {
    rank: role === "trainee" && "OCT",
    role: role === "trainee" ? "trainee" : "instructor",
    course: role === "trainee" ? "" : "nil",
  };

  const {
    register,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      const newUser = await signUpService(data);
      console.log("res", newUser);
      if (newUser !== null && newUser !== undefined) {
        const prompt = await Swal.fire({
          ...swalSettings(
            `Welcome to RBiS,\n${newUser.rank} ${newUser.formattedFullName}!`,
            "success"
          ),
          confirmButtonText: "Enter",
          allowOutsideClick: false,
        });
        if (prompt.isConfirmed) {
          setUser(newUser);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      errorSwal(err);
    }
    reset();
  };

  // const setShowCourseHandler = (e) => {
  //   setShowCourse(e.target.value === "trainee");
  //   if (e.target.value === "admin" || e.target.value === "instructor") {
  //     setValue("course", "nil");
  //   }
  // };

  return (
    <>
      <section className="bg-white dark:bg-[#202029] min-h-screen flex flex-col justify-center items-center">
        <main className="w-[350px] sm:min-w-[30%] sm:max-w-[30%] bg-[#1c1c24] p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl text-white mb-6 font-raleway font-semibold">
            Sign up
          </h1>
          <form
            className="mt-8"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            {role === "instructor" && (
              <div>
                <label
                  htmlFor="rank"
                  className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
                >
                  Rank
                </label>
                <select
                  id="rank"
                  {...register("rank")}
                  className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
                >
                  <option value="" disabled>
                    Select Rank
                  </option>
                  {/* <option value="OCT">OCT</option> */}
                  <option value="OCT">2LT</option>
                  <option value="LTA">LTA</option>
                  <option value="CPT">CPT</option>
                  <option value="CPT">MAJ</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name="rank"
                  render={({ message }) => (
                    <p className="text-red-400 text-xs mt-1">{message}</p>
                  )}
                />
              </div>
            )}
            {/* <div className="mt-4">
              <label
                htmlFor="role"
                className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
              >
                Role
              </label>
              <select
                id="role"
                {...register("role")}
                className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
                onChange={setShowCourseHandler}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="trainee">Trainee</option>
                <option value="instructor">Instructor</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="role"
                render={({ message }) => (
                  <p className="text-red-400 text-xs mt-1">{message}</p>
                )}
              />
            </div> */}
            {role === "trainee" && (
              <div className="mt-4">
                <label
                  htmlFor="course"
                  className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
                >
                  Course Intake
                </label>
                <select
                  id="course"
                  {...register("course")}
                  className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  <option value="21st AWO(ADW)">21st AWO(ADW)</option>
                  <option value="22nd AWO(ADW)">22nd AWO(ADW)</option>
                  <option value="24th AWO(ADW)">24th AWO(ADW)</option>
                  <option value="25th AWO(ADW)">25th AWO(ADW)</option>
                  <option value="27th AWO(ADW)">27th AWO(ADW)</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name="course"
                  render={({ message }) => (
                    <p className="text-red-400 text-xs mt-1">{message}</p>
                  )}
                />
              </div>
            )}
            <div className="mt-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
              >
                Full Name (Name and Surname)
              </label>

              <input
                id="fullName"
                {...register("fullName")}
                placeholder="Please indicate full name (e.g. James Lim)"
                className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
              />
              <ErrorMessage
                errors={errors}
                name="fullName"
                render={({ message }) => (
                  <p className="text-red-400 text-xs mt-1">{message}</p>
                )}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
              >
                Email <span className="text-xs">(e.g. Gmail)</span>
              </label>

              <input
                id="email"
                {...register("email")}
                placeholder="e.g. jameslim@gmail.com"
                className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-400 text-xs mt-1">{message}</p>
                )}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
              >
                Username
              </label>

              <input
                id="username"
                {...register("username")}
                placeholder="Username"
                className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
              />
              <ErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => (
                  <p className="text-red-400 text-xs mt-1">{message}</p>
                )}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="Password"
                className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={visibility ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Password (case-sensitive)"
                  {...register("password")}
                  id="Password"
                  className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-red-400 text-xs mt-1">{message}</p>
                  )}
                />
                <PasswordVisibilityButton
                  visibility={visibility}
                  handlePasswordVisibility={handlePasswordVisibility}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-raleway font-medium text-gray-700 dark:text-gray-200"
              >
                Password Confirmation
              </label>
              <div className="relative">
                <input
                  type={visibility ? "text" : "password"}
                  autoComplete="off"
                  id="PasswordConfirmation"
                  placeholder="Password Confirmation"
                  {...register("confirmPassword")}
                  className="mt-1 w-full rounded-xs border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#2a2a36] dark:text-gray-200 p-2 font-raleway"
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => (
                    <p className="text-red-400 text-xs mt-1">{message}</p>
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
                className="w-full inline-block shrink-0 rounded-none border border-[#7299f2] bg-[#7299f2] px-12 py-2 text-md font-semibold text-black transition hover:bg-transparent  focus:outline-none focus:ring dark:hover:bg-[#4975d9] font-raleway"
              >
                Create an account
              </button>
            </div>
          </form>
          <p className="mt-4 font-raleway text-sm">
            {" "}
            <span className="mr-1">Already have an account?</span>
            <Link to="/login" className="text-stone-500 hover:text-[#7299f2]">
              Log in
            </Link>
            .
          </p>
        </main>
      </section>
    </>
  );
};

export default SignupForm;
