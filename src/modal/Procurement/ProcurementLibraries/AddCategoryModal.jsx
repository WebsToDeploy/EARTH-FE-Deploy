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
import PRCategory, {
  initialPRCategory,
} from "validation/pr-libraries/procurement-category";
import procurementService from "services/procurement-service";
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

export default function AddCategoryModal({ open, handleClose, onSuccess }) {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const moduleName = "category";

  const formik = useFormik({
    initialValues: initialPRCategory,

    validationSchema: PRCategory,
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
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          style={{ zIndex: 1 }}
        >
          <Box mb={4}>
            <Header title="Add Category" mb={4} />
          </Box>
          <Box mx={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
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

AddCategoryModal.defaultProps = {
  handleClose: () => {},
  onSuccess: () => {},
};

AddCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  onSuccess: PropTypes.func,
};
