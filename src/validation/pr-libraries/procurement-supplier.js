import { string, object } from "yup";

const ProcurementSupplier = object().shape({
  name: string().required("Required"),
  address: string().required("Required"),
  phone_no: string().required("Required"),
  mobile_no: string().required("Required"),
  tin_no: string().required("Required"),
});

export const initialPRSupplier = {
  name: "",
  address: "",
  phone_no: "",
  mobile_no: "",
  tin_no: "",
};
export default ProcurementSupplier;
