import { string, object } from "yup";

const ProcurementCategory = object().shape({
  name: string().required("Required"),
});

export const initialPRCategory = {
  name: "",
};
export default ProcurementCategory;
