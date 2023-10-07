import { string, object } from "yup";

const ProcurementBrand = object().shape({
  name: string().required("Required"),
});

export const initialPRBrand = {
  name: "",
};
export default ProcurementBrand;
