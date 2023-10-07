import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Box, TextField, Grid, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import ProcurementOrder, { initialPROrder } from "validation/pr-order";
import Header from "components/PrivateComponents/eglogistics/Header";
import TextFieldDatePicker from "components/PrivateComponents/eglogistics/Textfields/Datepicker";
import dayjs from "dayjs";
import procurementService from "services/procurement-service";
import SnackbarComponent from "components/PrivateComponents/SnackBarComponent";

export default function PurchaseOrderModal({ open, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const moduleName = "purchaseOrder";

  const formik = useFormik({
    initialValues: initialPROrder,

    validationSchema: ProcurementOrder,
    onSubmit: () => {
      setLoading(true);
      procurementService
        .addAPI(formik.values, moduleName)
        .then(() => {
          formik?.resetForm();
          setOpenSuccess(true);
        })
        .catch(() => {
          setOpenError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        formik.resetForm();
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "65vh",
            width: "60vw",
            backgroundColor: (themeMode) =>
              themeMode.palette.mode === "dark" ? "#1f2a40" : "#fff",
            borderRadius: "5px",
            boxShadow: 24,
            py: "40px",
            px: "50px",
          }}
        >
          <Header title="Add Purchase Order" mb={4} />
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextFieldDatePicker
                  label="Date"
                  disabled={loading}
                  value={formik?.values?.date}
                  onChange={(evt) =>
                    formik?.setFieldValue(
                      "date",
                      dayjs(evt).format("YYYY-MM-DD"),
                      true
                    )
                  }
                  width="100%"
                  variant="outlined"
                  maxDate={new Date()}
                  error={
                    Boolean(formik.touched.date) && Boolean(formik.errors.date)
                  }
                  helperText={formik.touched.date && formik.errors.date}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldDatePicker
                  label="Due Date"
                  disabled={loading}
                  value={formik?.values?.due_date}
                  onChange={(evt) =>
                    formik?.setFieldValue(
                      "due_date",
                      dayjs(evt).format("YYYY-MM-DD"),
                      true
                    )
                  }
                  width="100%"
                  variant="outlined"
                  maxDate={new Date()}
                  error={
                    Boolean(formik.touched.due_date) &&
                    Boolean(formik.errors.due_date)
                  }
                  helperText={formik.touched.due_date && formik.errors.due_date}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Company Name / Supplier"
                  name="company_name_supplier"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.company_name_supplier}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.company_name_supplier &&
                    Boolean(formik.errors?.company_name_supplier)
                  }
                  helperText={
                    formik.touched?.company_name_supplier &&
                    formik.errors?.company_name_supplier
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Address"
                  name="address"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.address && Boolean(formik.errors?.address)
                  }
                  helperText={formik.touched?.address && formik.errors?.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Terms of Agreement"
                  name="terms_of_agreement"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.terms_of_agreement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.terms_of_agreement &&
                    Boolean(formik.errors?.terms_of_agreement)
                  }
                  helperText={
                    formik.touched?.terms_of_agreement &&
                    formik.errors?.terms_of_agreement
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Item Code"
                  name="item_code"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.item_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.item_code &&
                    Boolean(formik.errors?.item_code)
                  }
                  helperText={
                    formik.touched?.item_code && formik.errors?.item_code
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Description"
                  name="description"
                  variant="outlined"
                  fullWidth
                  size="small"
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
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.quantity && Boolean(formik.errors?.quantity)
                  }
                  helperText={
                    formik.touched?.quantity && formik.errors?.quantity
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Unit"
                  name="unit"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.unit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={formik.touched?.unit && Boolean(formik.errors?.unit)}
                  helperText={formik.touched?.unit && formik.errors?.unit}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Remarks"
                  name="remarks"
                  variant="outlined"
                  fullWidth
                  size="small"
                  disabled={loading}
                  value={formik.values?.remarks}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.remarks && Boolean(formik.errors?.remarks)
                  }
                  helperText={formik.touched?.remarks && formik.errors?.remarks}
                />
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={2} mt={1}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#3e4396",
                    ":hover": {
                      backgroundColor: "#a4a9fc",
                    },
                    padding: "10px",
                  }}
                >
                  <Typography fontWeight="bold">Save</Typography>
                </Button>
              </Grid>
              <Grid item xs={2} mt={1}>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#3e4396",
                    ":hover": {
                      backgroundColor: "#a4a9fc",
                    },
                    padding: "10px",
                  }}
                >
                  <Typography fontWeight="bold">Cancel</Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <SnackbarComponent
          open={openSuccess}
          onClose={handleCloseSuccess}
          severity="success"
          message="Added successfully."
        />
        <SnackbarComponent
          open={openError}
          onClose={handleCloseError}
          severity="error"
          message="Adding failed."
        />
      </Box>
    </Modal>
  );
}

PurchaseOrderModal.defaultProps = {
  handleClose: () => {},
};

PurchaseOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};
