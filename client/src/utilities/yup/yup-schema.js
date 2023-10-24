import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  rank: yup.string().required("Please select your rank"),
  role: yup.string().required("Please select your role"),
  course: yup.string().required("Please select your course"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(5, "Come on, your name isn't that short"),
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(10, "Password must be at least 10 characters")
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
  username: yup.string().required("Username is required"),
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
  category: yup.string().required("Category is required"),
  equipment: yup.string().required("Equipment is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  loanStartDate: yup
    .date()
    .max(yup.ref("loanEndDate"), "Start date must be before end date")
    .required("Loan Start Date is required"),
  loanEndDate: yup
    .date()
    .min(yup.ref("loanStartDate"), "End date must be after start date")
    .required("Loan End Date is required"),
  lastServicingDate: yup
    .date()
    .max(yup.ref("loanEndDate"), "Servicing date must be before end date")
    .required("Last Servicing Date is required"),
  servicingFrequency: yup.number().required("Frequency is required"),
});
