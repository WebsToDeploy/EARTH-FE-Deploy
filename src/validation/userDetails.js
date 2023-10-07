import { string, object } from "yup";

const UserDetails = object().shape({
  firstname: string().required("Required"),
  lastname: string().required("Required"),
});

export default UserDetails;
