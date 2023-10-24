import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addEquipmentService } from "../../../utilities/equipment/equipment-service";
import { useAtom } from "jotai";
import { setEquipmentAtom } from "../../../utilities/atom-jotai/atom";
import { addEquipmentSchema } from "../../../utilities/yup/yup-schema";

const AddEquipmentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEquipmentSchema),
  });
  const [dates, setDates] = useState({
    loanStartDate: null,
    loanEndDate: null,
    servicingDate: null,
  });
  const [, setEquipment] = useAtom(setEquipmentAtom);

  const categoryOptions = [
    { value: "RBS 70", label: "RBS 70" },
    { value: "PSTAR", label: "PSTAR" },
    { value: "Signal", label: "Signal" },
  ];
  const equipmentOptions = [
    { value: "Sight", label: "Sight" },
    { value: "Stand", label: "Stand" },
    { value: "Missile", label: "Missile" },
  ];

  const handleDateChange = (date, field) => {
    setDates((prevDates) => ({ ...prevDates, [field]: date }));
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const newEquipment = await addEquipmentService(data);
      console.log(newEquipment);
      setEquipment((prevEquipment) => [
        ...prevEquipment,
        newEquipment.data.updatedEquipment,
      ]);
      reset();
      setDates({
        loanStartDate: null,
        loanEndDate: null,
        servicingDate: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full h-full">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 xl:col-start-4 xl:col-end-10">
          <div className="max-w-xl lg:max-w-3xl">
            <h1>Equipment</h1>
            <form
              className="mt-8 grid grid-cols-1 gap-6"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-span-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoryOptions}
                      className="mt-1"
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="category"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="equipment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Equipment
                </label>
                <Controller
                  name="equipment"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={equipmentOptions}
                      className="mt-1"
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="equipment"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Equipment S/N
                </label>
                <input
                  {...register("serialNumber")}
                  id="serialNumber"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                />
                <ErrorMessage
                  errors={errors}
                  name="serialNumber"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="loanStartDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Loan Start Date
                </label>
                <Controller
                  name="loanStartDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      selected={dates.loanStartDate}
                      onChange={(date) => {
                        handleDateChange(date, "loanStartDate");
                        field.onChange(date);
                      }}
                      dateFormat="dd-MMM-yyyy"
                      id="loanStartDate"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                      showMonthDropdown
                      scrollableYearDropdown
                      showYearDropdown
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="loanStartDate"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="loanEndDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Loan End Date
                </label>
                <Controller
                  name="loanEndDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      selected={dates.loanEndDate}
                      onChange={(date) => {
                        handleDateChange(date, "loanEndDate");
                        field.onChange(date);
                      }}
                      id="loanEndDate"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                      showMonthDropdown
                      scrollableYearDropdown
                      showYearDropdown
                      dateFormat="dd-MMM-yyyy"
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="loanEndDate"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="lastServicingDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Servicing Date
                </label>
                <Controller
                  name="lastServicingDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      selected={dates.servicingDate}
                      onChange={(date) => {
                        handleDateChange(date, "servicingDate");
                        field.onChange(date);
                      }}
                      id="lastServicingDate"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-2"
                      showMonthDropdown
                      scrollableYearDropdown
                      showYearDropdown
                      dateFormat="dd-MMM-yyyy"
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="lastServicingDate"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="frequency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Servicing Frequency
                </label>
                {/* <input
                  {...register("frequency")}
                  type="number"
                  id="frequency"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                /> */}
                <div className="flex flex-col">
                  <label className="inline-flex items-center mt-1">
                    <input
                      type="radio"
                      {...register("frequency")}
                      value="1"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Monthly</span>
                  </label>
                  <label className="inline-flex items-center mt-1">
                    <input
                      type="radio"
                      {...register("frequency")}
                      value="3"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">3-Monthly</span>
                  </label>
                  <label className="inline-flex items-center mt-1">
                    <input
                      type="radio"
                      {...register("frequency")}
                      value="6"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">6-Monthly</span>
                  </label>
                  <label className="inline-flex items-center mt-1">
                    <input
                      type="radio"
                      {...register("frequency")}
                      value="12"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Yearly</span>
                  </label>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="frequency"
                  render={({ message }) => (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                />
              </div>

              <div className="col-span-1">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AddEquipmentForm;
