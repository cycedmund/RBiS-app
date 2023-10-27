const yup = require("yup");

const signUpSchema = yup.object().shape({
  rank: yup.string().required("Please select your rank"),
  role: yup.string().required("Please select your role"),
  course: yup.string().required("Please select your course"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(5, "Come on, your name isn't that short")
    .max(40, "Your name can't be that long right?")
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
      const validDomains = ["gmail.com", "live.com"];
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

const loginSchema = yup.object().shape({
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

const addEquipmentSchema = yup.object().shape({
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

module.exports = { loginSchema, signUpSchema, addEquipmentSchema };
