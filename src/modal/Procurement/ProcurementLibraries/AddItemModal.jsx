import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  // useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import PRItem, {
  initialPRItem,
} from "validation/pr-libraries/procurement-item";
import procurementService from "services/procurement-service";
import SelectBrand from "components/PrivateComponents/eglogistics/Textfields/SelectBrand";
import SelectSupplier from "components/PrivateComponents/eglogistics/Textfields/SelectSupplier";
import SelectCategory from "components/PrivateComponents/eglogistics/Textfields/SelectCategory";
import Header from "components/PrivateComponents/eglogistics/Header";
// import themes from "../../themes/theme";

const style = {
  backgroundColor: (themeMode) =>
    themeMode.palette.mode === "dark" ? "#1f2a40" : "#fff",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "70vh",
  width: "40vw",
  boxShadow: 24,
  p: 4,
};

// const { tokens } = themes;

export default function AddItemModal({ open, handleClose, onSuccess }) {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const moduleName = "product";

  const formik = useFormik({
    initialValues: initialPRItem,

    validationSchema: PRItem,
    onSubmit: () => {
      setError("");
      setLoading(true);
      procurementService
        .addAPI({ added_by: 1, ...formik.values }, moduleName)
        .then(() => {
          formik?.resetForm();
          onSuccess?.();
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        formik.resetForm();
        setError("");
      }}
    >
      <Box sx={style}>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ zIndex: 1 }}
        >
          <Box mb={4}>
            <Header title="Add Item" mb={4} />
          </Box>
          <Box mx={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  name="name"
                  variant="outlined"
                  size="small"
                  sx={{ width: "60%" }}
                  disabled={loading}
                  value={formik.values?.name}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("name", e.target.value.toUpperCase());
                  }}
                  onBlur={formik.handleBLur}
                  error={formik.touched?.name && Boolean(formik.errors?.name)}
                  helperText={formik.touched?.name && formik.errors?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  name="price"
                  variant="outlined"
                  size="small"
                  type="number"
                  sx={{ width: "60%" }}
                  disabled={loading}
                  value={formik.values?.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={formik.touched?.price && Boolean(formik.errors?.price)}
                  helperText={formik.touched?.price && formik.errors?.price}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectBrand
                  label="Select Brand"
                  name="brand_id"
                  disabled={loading}
                  value={formik.values.brand_id}
                  onChange={(fieldName, selectedValue) => {
                    formik.setFieldValue(fieldName, selectedValue);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.brand_id && Boolean(formik.errors.brand_id)
                  }
                  helperText={
                    (formik.touched.brand_id && formik.errors.brand_id) || ""
                  }
                  width="60%"
                />
              </Grid>
              <Grid item xs={12}>
                <SelectCategory
                  label="Select Category"
                  name="category_id"
                  disabled={loading}
                  value={formik.values?.category_id}
                  onChange={(fieldName, selectedValue) => {
                    formik.setFieldValue(fieldName, selectedValue);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched?.category_id &&
                    Boolean(formik.errors?.category_id)
                  }
                  helperText={
                    (formik.touched?.category_id &&
                      formik.errors?.category_id) ||
                    ""
                  }
                  width="60%"
                />
              </Grid>
              <Grid item xs={12}>
                <SelectSupplier
                  label="Select Supplier"
                  name="supplier_id"
                  disabled={loading}
                  value={formik.values?.supplier_id}
                  onChange={(fieldName, selectedValue) => {
                    formik.setFieldValue(fieldName, selectedValue);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched?.supplier_id &&
                    Boolean(formik.errors?.supplier_id)
                  }
                  helperText={
                    (formik.touched?.supplier_id &&
                      formik.errors?.supplier_id) ||
                    ""
                  }
                  width="60%"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  size="small"
                  sx={{ width: "60%" }}
                  disabled={loading}
                  value={formik.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.description &&
                    Boolean(formik.errors?.description)
                  }
                  helperText={
                    formik.touched?.description && formik.errors?.description
                  }
                />
              </Grid>
            </Grid>
          </Box>

          {error}
          {open && (
            <Box sx={{ textAlign: "right", height: 100 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 2, mt: 5, width: 80, backgroundColor: "#6b70c4" }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  mt: 5,
                  width: 80,
                  backgroundColor: "#3e4287",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Modal>
  );
}

AddItemModal.defaultProps = {
  handleClose: () => {},
  onSuccess: () => {},
};

AddItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  onSuccess: PropTypes.func,
};
