import * as yup from "yup";

const FormSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters in length")
    .matches(/[0-9]/, "Password must contain a minimum of 1 numberic character")
    .matches(/[a-z]/, "Password must contain a minimum of 1 lower case letter")
    .matches(/[A-Z]/, "Password must contain a minimum of 1 upper case letter")
    .required("Required")
    .matches(/[^\w]/, "Password must contain a minimum of 1 special character"),

  confirm: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
});

export default FormSchema;
