import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import PRRegistration, { initialRegistration } from "validation/registration";
import accountService from "services/account-service";
import SelectRole from "components/PrivateComponents/eglogistics/Textfields/SelectRole";
import Header from "components/PrivateComponents/eglogistics/Header";
import SnackbarComponent from "../components/PrivateComponents/SnackBarComponent";

export default function RegisterModal({ open, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const formik = useFormik({
    initialValues: initialRegistration,

    validationSchema: PRRegistration,
    onSubmit: () => {
      setLoading(true);
      accountService
        .register(formik.values)
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            width: "37vw",
            height: "600px",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
            maxWidth: "100%",
            maxWeight: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: (themeMode) =>
                themeMode.palette.mode === "dark" ? "#1f2a40" : "#fff",
              width: "37vw",
              borderRadius: "5px",
              p: "50px",
            }}
          >
            <Header title="CREATE ACCOUNT" mb={2} />
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="First Name"
                    name="firstname"
                    variant="outlined"
                    fullWidth
                    disabled={loading}
                    value={formik.values?.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBLur}
                    error={
                      formik.touched?.firstname &&
                      Boolean(formik.errors?.firstname)
                    }
                    helperText={
                      formik.touched?.firstname && formik.errors?.firstname
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last Name"
                    name="lastname"
                    variant="outlined"
                    fullWidth
                    disabled={loading}
                    value={formik.values?.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBLur}
                    error={
                      formik.touched?.lastname &&
                      Boolean(formik.errors?.lastname)
                    }
                    helperText={
                      formik.touched?.lastname && formik.errors?.lastname
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="User Name"
                    name="username"
                    variant="outlined"
                    fullWidth
                    disabled={loading}
                    value={formik.values?.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBLur}
                    error={
                      formik.touched?.username &&
                      Boolean(formik.errors?.username)
                    }
                    helperText={
                      formik.touched?.username && formik.errors?.username
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    disabled={loading}
                    type={showPassword ? "text" : "password"}
                    value={formik.values?.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBLur}
                    error={
                      formik.touched?.password &&
                      Boolean(formik.errors?.password)
                    }
                    helperText={
                      formik.touched?.password && formik.errors?.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SelectRole
                    label="Access Level"
                    name="role"
                    fullWidth
                    disabled={loading}
                    value={formik.values?.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBLur}
                    error={formik.touched?.role && Boolean(formik.errors?.role)}
                    helperText={formik.touched?.role && formik.errors?.role}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      backgroundColor: "#3e4396",
                      ":hover": {
                        backgroundColor: "#a4a9fc",
                      },
                      padding: "17px",
                    }}
                  >
                    <Typography fontWeight="bold">Register</Typography>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
        <SnackbarComponent
          open={openSuccess}
          onClose={handleCloseSuccess}
          severity="success"
          message="Registered successfully."
        />
        <SnackbarComponent
          open={openError}
          onClose={handleCloseError}
          severity="error"
          message="Registration failed."
        />
      </Box>
    </Modal>
  );
}

RegisterModal.defaultProps = {
  handleClose: () => {},
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};
