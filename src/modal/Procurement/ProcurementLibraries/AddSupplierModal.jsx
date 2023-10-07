import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import PRSupplier, {
  initialPRSupplier,
} from "validation/pr-libraries/procurement-supplier";
import procurementService from "services/procurement-service";
import Header from "components/PrivateComponents/eglogistics/Header";

const style = {
  backgroundColor: (themeMode) =>
    themeMode.palette.mode === "dark" ? "#1f2a40" : "#fff",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "70vh",
  width: "60vw",
  boxShadow: 24,
  p: 4,
};

export default function AddSupplierModal({ open, handleClose, onSuccess }) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const moduleName = "supplier";

  const formik = useFormik({
    initialValues: initialPRSupplier,

    validationSchema: PRSupplier,
    onSubmit: () => {
      setError("");
      setLoading(true);
      procurementService
        .addAPI(formik.values, moduleName)
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
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Box mb={4}>
            <Header title="Add Supplier" mb={4} />
          </Box>
          <Box mx={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Company Name"
                  name="name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ pr: 5 }}
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
              <Grid item xs={6}>
                <TextField
                  label="Address"
                  name="address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ pr: 5 }}
                  disabled={loading}
                  value={formik.values?.address}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue(
                      "address",
                      e.target.value.toUpperCase()
                    );
                  }}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.address && Boolean(formik.errors?.address)
                  }
                  helperText={formik.touched?.address && formik.errors?.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone No."
                  name="phone_no"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  sx={{ pr: 5 }}
                  disabled={loading}
                  value={formik.values?.phone_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.phone_no && Boolean(formik.errors?.phone_no)
                  }
                  helperText={
                    formik.touched?.phone_no && formik.errors?.phone_no
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Mobile No."
                  name="mobile_no"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  sx={{ pr: 5 }}
                  disabled={loading}
                  value={formik.values?.mobile_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.mobile_no &&
                    Boolean(formik.errors?.mobile_no)
                  }
                  helperText={
                    formik.touched?.mobile_no && formik.errors?.mobile_no
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TIN No."
                  name="tin_no"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  sx={{ pr: 5 }}
                  disabled={loading}
                  value={formik.values?.tin_no}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue(
                      "tin_no",
                      e.target.value.toUpperCase()
                    );
                  }}
                  onBlur={formik.handleBLur}
                  error={
                    formik.touched?.tin_no && Boolean(formik.errors?.tin_no)
                  }
                  helperText={formik.touched?.tin_no && formik.errors?.tin_no}
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

AddSupplierModal.defaultProps = {
  handleClose: () => {},
  onSuccess: () => {},
};

AddSupplierModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  onSuccess: PropTypes.func,
};
