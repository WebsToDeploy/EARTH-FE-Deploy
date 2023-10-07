import { string, object } from "yup";

export const RegisterValidation = object().shape({
  username: string().required("Required"),
  password: string().required("Required"),
  firstname: string().required("Required"),
  lastname: string().required("Required"),
  region: string().required("Required"),
  role: string().required("Required"),
});

export const initialUsers = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  region: "",
  role: "",
};
export default RegisterValidation;
