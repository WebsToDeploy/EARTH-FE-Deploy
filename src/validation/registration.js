import { string, object } from "yup";

const Registration = object().shape({
  username: string().required("Required"),
  password: string()
    .required("Required")
    .matches(/[0-9]/, "Password must contain a minimum of 1 numberic character")
    .matches(/[a-z]/, "Password must contain a minimum of 1 lower case letter")
    .matches(/[A-Z]/, "Password must contain a minimum of 1 upper case letter")
    .matches(/[^\w]/, "Password must contain a minimum of 1 special character"),
  firstname: string().required("Required"),
  lastname: string().required("Required"),
  role: string().required("Required"),
});

export const initialRegistration = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  role: "",
};
export default Registration;
