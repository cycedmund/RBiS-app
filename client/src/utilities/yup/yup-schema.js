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
