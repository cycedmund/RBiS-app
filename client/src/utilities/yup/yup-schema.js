import { startOfDay } from "date-fns";
import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  rank: yup.string().required("Please select your rank"),
  role: yup.string().required("Please select your role"),
  course: yup.string().required("Please select your course"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(5, "Come on, your name isn't that short")
    .max(40, "Your name can't be that long right?")
    .matches(/^[^\d]+$/, "Full name cannot contain numbers")
    .matches(/\s/, "Please include spaces between your surname and name"),
  email: yup
    .string()
    .required("Email is required")
    .min(5, "Come on, your email isn't that short")
    .test("has-sign", "Email must contain @", (value) => {
      if (!value) {
        return true;
      }
      return value.includes("@");
    })
    .test("is-valid-domain", "Invalid email domain", (value) => {
      if (!value) {
        return true;
      }
      const validDomains = ["gmail.com"];
      const domain = value.split("@")[1];
      if (domain) {
        return validDomains.includes(domain);
      } else {
        return true;
      }
    })
    .test("is-domain-numeric", "Invalid email domain", (value) => {
      if (!value) {
        return true;
      }
      const domain = value.split("@")[1];
      if (domain) {
        return isNaN(domain[0]);
      } else {
        return true;
      }
    })
    .email("Invalid email address"),
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(32, "Your username can't be that long right?")
    .matches(/^\S*$/, "Username cannot contain spaces"),
  password: yup
    .string()
    .required("Password is required")
    .min(10, "Password must be at least 10 characters")
    .matches(/^\S*$/, "Password cannot contain spaces")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^])[a-zA-Z\d@$!%*?&#^]+$/,
      "Password must be alphanumeric with at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(/^\S*$/, "Username cannot contain spaces"),
  password: yup
    .string()
    .required("Password is required")
    .min(10, "Password should be 10 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^])[a-zA-Z\d@$!%*?&#^]+$/,
      "Password should be alphanumeric with at least one special character"
    ),
});

export const addEquipmentSchema = yup.object().shape({
  category: yup
    .string()
    .required("Category is required.")
    .oneOf(["RBS 70", "PSTAR", "Signal"], "Invalid Category."),
  equipment: yup.string().required("Equipment is required."),
  serialNumber: yup.string().required("Serial Number is required."),
  loanStartDate: yup.date().required("Loan Start Date is required."),
  loanEndDate: yup
    .date()
    .required("Loan End Date is required.")
    .min(yup.ref("loanStartDate"), "End date must be after start date.")
    .test(
      "is-more-than-start-date",
      "End Date must be greater than Start Date.",
      function (value) {
        const startDate = this.resolve(yup.ref("loanStartDate"));
        const startDateFormat = startOfDay(new Date(startDate));
        const valueDate = startOfDay(new Date(value));
        return valueDate > startDateFormat;
      }
    )
    .test(
      "is-not-earlier-than-today",
      "End Date cannot be earlier than today's Date.",
      function (value) {
        const today = startOfDay(new Date());
        const valueDate = startOfDay(new Date(value));
        return valueDate >= today;
      }
    ),
  lastServicingDate: yup
    .date()
    .max(yup.ref("loanEndDate"), "Servicing date must be before end date")
    .required("Last Servicing Date is required"),
  servicingFrequency: yup.number().required("Frequency is required"),
});

export const editEquipmentSchema = yup.object().shape({
  serialNumber: yup.string().required("Serial Number is required."),
  loanStartDate: yup.date().required("Loan Start Date is required."),
  loanEndDate: yup
    .date()
    .required("Loan End Date is required")
    .test(
      "is-more-than-start-date",
      "End Date must be greater than Start Date.",
      function (value) {
        const startDate = this.resolve(yup.ref("loanStartDate"));
        const startDateFormat = startOfDay(new Date(startDate));
        const valueDate = startOfDay(new Date(value));
        return valueDate > startDateFormat;
      }
    )
    .test(
      "is-not-earlier-than-today",
      "End Date cannot be earlier than today's Date.",
      function (value) {
        const today = startOfDay(new Date());
        const valueDate = startOfDay(new Date(value));
        return valueDate >= today;
      }
    ),
});
