import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../../../utilities/yup/yup-schema";
import { signUpService } from "../../../../utilities/users/users-service";
import { useAtom } from "jotai";
import { setUserAtom } from "../../../../utilities/atom-jotai/atom";

// loop through options
// use Intl.english to auto generate course every 3months?

const SignupForm = () => {
  const [showCourse, setShowCourse] = useState(true);
  const [, setUser] = useAtom(setUserAtom);
  const navigate = useNavigate();

  const defaultValues = {
    rank: "OCT",
    role: "trainee",
    course: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const newUser = await signUpService(data);
      console.log("res", newUser);
      if (newUser !== null && newUser !== undefined) {
        setUser(newUser);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  const setShowCourseHandler = (e) => {
    setShowCourse(e.target.value === "trainee");
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 xl:col-start-4 xl:col-end-10">
            <div className="max-w-xl lg:max-w-3xl">
              <h1>Sign up</h1>
              <form
                className="mt-8 grid grid-cols-6 gap-6"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="rank"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Rank
                  </label>
                  <select
                    id="rank"
                    {...register("rank")}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
                  >
                    <option value="" disabled>
                      Select Rank
                    </option>
                    <option value="OCT">OCT</option>
                    <option value="OCT">2LT</option>
                    <option value="LTA">LTA</option>
                    <option value="CPT">CPT</option>
                    <option value="CPT">MAJ</option>
                  </select>
                  <ErrorMessage
                    errors={errors}
                    name="rank"
                    render={({ message }) => (
                      <p className="text-red-500 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role")}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
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
                      <p className="text-red-500 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>
                {showCourse && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="course"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Course Intake
                    </label>
                    <select
                      id="course"
                      {...register("course")}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
                    >
                      <option value="" disabled>
                        Select Course
                      </option>
                      <option value="20">21st ADW</option>
                      <option value="21">22nd ADW</option>
                      <option value="22">24th ADW</option>
                      <option value="23">25th ADW</option>
                      <option value="24">27th ADW</option>
                    </select>
                    <ErrorMessage
                      errors={errors}
                      name="course"
                      render={({ message }) => (
                        <p className="text-red-500 text-xs mt-1">{message}</p>
                      )}
                    />
                  </div>
                )}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Full Name (as per NRIC)
                  </label>

                  <input
                    id="fullName"
                    {...register("fullName")}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="fullName"
                    render={({ message }) => (
                      <p className="text-red-500 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    {...register("username")}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ message }) => (
                      <p className="text-red-500 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    autoComplete="off"
                    {...register("password")}
                    id="Password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className="text-red-500 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    autoComplete="off"
                    id="PasswordConfirmation"
                    {...register("confirmPassword")}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 p-2"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="confirmPassword"
                    render={({ message }) => (
                      <p className="text-red-500 text-xs mt-1">{message}</p>
                    )}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-gray-700 underline dark:text-gray-200"
                    >
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
