import { string, object, number } from "yup";

const ProcurementOrder = object().shape({
  date: string().required("Required"),
  due_date: string().required("Required"),
  company_name_supplier: string().required("Required"),
  address: string().required("Required"),
  terms_of_agreement: string().required("Required"),
  item_code: string().required("Required"),
  description: string().required("Required"),
  quantity: number().required("Required"),
  unit: string().required("Required"),
  remarks: string().required("Required"),
});

export const initialPROrder = {
  date: "",
  due_date: "",
  company_name_supplier: "",
  address: "",
  terms_of_agreement: "",
  item_code: "",
  description: "",
  quantity: "",
  unit: "",
  remarks: "",
};

export default ProcurementOrder;
