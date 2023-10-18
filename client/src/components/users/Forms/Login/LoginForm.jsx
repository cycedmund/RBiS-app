import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../utilities/yup/yup-schema";
import { loginService } from "../../../../utilities/users/users-service";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { setUserAtom } from "../../../../utilities/atom-jotai/atom";

const LoginForm = () => {
  const [, setUser] = useAtom(setUserAtom);
  const navigate = useNavigate();

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
    try {
      const user = await loginService(data);
      if (user !== null && user !== undefined) {
        setUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 xl:col-start-4 xl:col-end-10">
            <div className="max-w-xl lg:max-w-3xl">
              <h1>Log In</h1>
              <form
                className="mt-8 grid grid-cols-6 gap-6"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
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

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
