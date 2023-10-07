import { string, object, number } from "yup";

const ProcurementRequest = object().shape({
  company_name: string().required("Required"),
  address: string().required("Required"),
  attention: string().required("Required"),
  item_code: string().required("Required"),
  description: string().required("Required"),
  quantity: number().required("Required"),
  price: string().required("Required"),
  total_amount: number().required("Required"),
  remarks: string().required("Required"),
  date: string().required("Required"),
});

export const initialPRRequest = {
  company_name: "",
  address: "",
  attention: "",
  item_code: "",
  description: "",
  quantity: "",
  price: "",
  total_amount: "",
  remarks: "",
  date: "",
};

export default ProcurementRequest;
