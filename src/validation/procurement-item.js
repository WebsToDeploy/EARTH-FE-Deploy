import { string, object, number } from "yup";

const ProcurementItem = object().shape({
  name: string().required("Required"),
  brand_id: number().required("Required"),
  category_id: number().required("Required"),
  supplier_id: number().required("Required"),
  price: number().required("Required"),
  description: string().required("Required"),
});

export const initialPRItem = {
  name: "",
  brand_id: null,
  category_id: null,
  supplier_id: null,
  price: null,
  description: "",
};

export default ProcurementItem;
