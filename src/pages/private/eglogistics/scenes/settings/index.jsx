/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
import { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SnackbarComponent from "components/PrivateComponents/SnackBarComponent";
import UserDetails from "validation/userDetails";
import FormSchema from "validation/userAccount";
import accountService from "services/account-service";
import { useStateContext } from "contexts/ContextProvider";
import { useFormik } from "formik";
import themes from "themes/theme";
//  import mockTransaction from "../../../../../data/mockData";

const { tokens } = themes;
//  const { mockTransactions } = mockTransaction;

export default function Settings() {
  //  const theme = useTheme();
  //  const colors = tokens(theme.palette.mode);
  const { auth } = useStateContext();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleToggleOldPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleTogglePasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
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

  const detailsFormik = useFormik({
    initialValues: {
      firstname: auth.firstname,
      lastname: auth.lastname,
    },

    validationSchema: UserDetails,
    onSubmit: () => {
      setLoading(true);
      accountService
        .updateUserPersonal(auth.uuid, detailsFormik.values)
        .then(() => {
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

  const accountFormik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },

    validationSchema: FormSchema,
    onSubmit: () => {
      setLoading(true);
      accountService
        .updateUserAccount(auth.uuid, accountFormik.values)
        .then(() => {
          accountFormik?.resetForm();
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

  return (
    <Box m="20px">
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        borderRadius="5px"
        boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
        position="relative"
        backgroundColor={colors.primary[400]}
        height="auto"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            aria-label="simple tabs example"
          >
            <Tab
              label="User Details"
              style={{
                margin: "0 20px 0 20px",
                letterSpacing: "0.3em",
                fontFamily: "Poppins, sans-serif",
                fontSize: "small",
                fontWeight: "900",
                color: colors.grey[100],
              }}
            />
            <Tab
              label="Account Information"
              style={{
                margin: "0 20px 0 20px",
                letterSpacing: "0.3em",
                fontFamily: "Poppins, sans-serif",
                fontSize: "small",
                fontWeight: "900",
                color: colors.grey[100],
              }}
            />
          </Tabs>
        </Box>
        <Box role="tabpanel">
          {selectedTab === 0 && (
            <>
              <form onSubmit={detailsFormik.handleSubmit} autoComplete="off">
                <Box
                  mt={4}
                  mx={4}
                  p={2}
                  borderRadius="5px"
                  backgroundColor={colors.primary[400]}
                  boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
                  minHeight="250px"
                >
                  <Typography variant="h5" mb={4}>
                    Personal Information
                  </Typography>

                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        label="First Name"
                        name="firstname"
                        fullWidth
                        disabled={loading}
                        value={detailsFormik.values?.firstname}
                        onChange={detailsFormik.handleChange}
                        onBlur={detailsFormik.handleBLur}
                        error={
                          detailsFormik.touched?.firstname &&
                          Boolean(detailsFormik.errors?.firstname)
                        }
                        helperText={
                          detailsFormik.touched?.firstname &&
                          detailsFormik.errors?.firstname
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Last Name"
                        name="lastname"
                        fullWidth
                        disabled={loading}
                        value={detailsFormik.values?.lastname}
                        onChange={detailsFormik.handleChange}
                        onBlur={detailsFormik.handleBLur}
                        error={
                          detailsFormik.touched?.lastname &&
                          Boolean(detailsFormik.errors?.lastname)
                        }
                        helperText={
                          detailsFormik.touched?.lastname &&
                          detailsFormik.errors?.lastname
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    padding: "10px",
                    backgroundColor: "#3e4396",
                    ":hover": {
                      backgroundColor: "#a4a9fc",
                    },
                  }}
                >
                  <OfflinePinIcon />
                  <Typography ml={1} fontWeight="bold">
                    UPDATE
                  </Typography>
                </Button>
              </form>
              <Box height="100px" />
            </>
          )}
          {selectedTab === 1 && (
            <>
              <form onSubmit={accountFormik.handleSubmit} autoComplete="off">
                <Box
                  mt={4}
                  mx={4}
                  py={2}
                  px={2}
                  borderRadius="5px"
                  backgroundColor={colors.primary[400]}
                  boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
                  minHeight="450px"
                >
                  <Typography variant="h5" mb={1}>
                    Account Information
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={auth.username}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="New Password"
                        name="password"
                        fullWidth
                        margin="normal"
                        type={showNewPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle old password visibility"
                                onClick={handleToggleOldPasswordVisibility}
                              >
                                {showNewPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        disabled={loading}
                        value={accountFormik.values?.password}
                        onChange={accountFormik.handleChange}
                        onBlur={accountFormik.handleBLur}
                        error={
                          accountFormik.touched?.password &&
                          Boolean(accountFormik.errors?.password)
                        }
                        helperText={
                          accountFormik.touched?.password &&
                          accountFormik.errors?.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm New Password"
                        name="confirm"
                        fullWidth
                        margin="normal"
                        type={showConfirmNewPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleTogglePasswordVisibility}
                              >
                                {showConfirmNewPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        disabled={loading}
                        value={accountFormik.values?.confirm}
                        onChange={accountFormik.handleChange}
                        onBlur={accountFormik.handleBLur}
                        error={
                          accountFormik.touched?.confirm &&
                          Boolean(accountFormik.errors?.confirm)
                        }
                        helperText={
                          accountFormik.touched?.confirm &&
                          accountFormik.errors?.confirm
                        }
                      />
                    </Grid>
                    <ul>
                      <li style={{ color: "#d32f2f" }}>
                        <Typography fontWeight="bold" color="#d32f2f">
                          Password must be at least 8 characters in length
                        </Typography>
                      </li>
                      <li style={{ color: "#d32f2f" }}>
                        <Typography fontWeight="bold" color="#d32f2f">
                          Password must contain a minimum of 1 upper case letter
                          [A-Z]
                        </Typography>
                      </li>
                      <li style={{ color: "#d32f2f" }}>
                        <Typography fontWeight="bold" color="#d32f2f">
                          Password must contain a minimum of 1 lower case letter
                          [a-z]
                        </Typography>
                      </li>
                      <li style={{ color: "#d32f2f" }}>
                        <Typography fontWeight="bold" color="#d32f2f">
                          Password must contain a minimum of 1 numberic
                          character [0-9]
                        </Typography>
                      </li>
                      <li style={{ color: "#d32f2f" }}>
                        <Typography fontWeight="bold" color="#d32f2f">
                          Password must contain a minimum of 1 special character
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    padding: "10px",
                    backgroundColor: "#3e4396",
                    ":hover": {
                      backgroundColor: "#a4a9fc",
                    },
                  }}
                >
                  <OfflinePinIcon />
                  <Typography ml={1} fontWeight="bold">
                    UPDATE
                  </Typography>
                </Button>
              </form>
              <Box height="100px" />
            </>
          )}
        </Box>
      </Box>
      <SnackbarComponent
        open={openSuccess}
        onClose={handleCloseSuccess}
        severity="success"
        message="Updated successfully."
      />
      <SnackbarComponent
        open={openError}
        onClose={handleCloseError}
        severity="error"
        message="Update failed."
      />
    </Box>
  );
}
