import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import { useStateContext } from "contexts/ContextProvider";
import accountService from "services/account-service";
import Logo from "../assets/images/logo.png";
import EGLogo from "../assets/eglogistics.png";
import BontradeLogo from "../assets/bontrade1.png";
import UGLogo from "../assets/ugtrade.png";
import EroLogo from "../assets/erotas.png";
import loginValidation, { initialLog } from "../validation/login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "85vh",
  width: "75vw",
  boxShadow: 24,
};

export default function LoginModal({ open, handleClose, logo }) {
  const { setAuth } = useStateContext();

  const [logoDisplay, setLogoDisplay] = useState({});

  const navigate = useNavigate();

  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialLog,
    validationSchema: loginValidation,
    onSubmit: async () => {
      setLoading(true);
      setError("");
      try {
        const res = await accountService.authenticate(formik?.values);
        if (res.valid) {
          setAuth(res.data);

          if (logo === "eg" && res.data.role === "superadmin") {
            navigate("/dashboard");
          } else if (logo === "bon" && res.data.role === "bontrade") {
            navigate("/bontrade");
          } else if (logo === "ug" && res.data.role === "ugtrade") {
            navigate("/ugtrade");
          } else if (logo === "ero" && res.data.role === "erotas") {
            navigate("/erotas");
          } else {
            setError("Invalid Login Credentials");
          }
        }
      } catch (err) {
        let message = "";
        if (err?.response?.status === 404) {
          message = "Invalid Login Credentials";
        } else if (err?.response?.status === 401) {
          message = err.response.data.error;
        } else {
          message = "Internal Server Error";
        }
        setError(message || err?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (logo === "eg") {
      setLogoDisplay(EGLogo);
    } else if (logo === "bon") {
      setLogoDisplay(BontradeLogo);
    } else if (logo === "ug") {
      setLogoDisplay(UGLogo);
    } else if (logo === "ero") {
      setLogoDisplay(EroLogo);
    }
  }, [logo]);

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
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  height: "85vh",
                }}
              >
                {logo === "bon" ? (
                  <Box
                    component="img"
                    src={logoDisplay}
                    alt="Logo"
                    style={{
                      marginTop: "-150px",
                      width: "400px",
                      height: "300px",
                      display: "block",
                      borderRadius: "50%",
                      WebkitBoxReflect:
                        "below 0 -webkit-gradient(linear, right top, right bottom, from(transparent), to(rgba(255, 255, 255, 0.4)))",
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={logoDisplay}
                    alt="Logo"
                    style={{
                      marginTop: "-150px",
                      width: "300px",
                      height: "300px",
                      display: "block",
                      borderRadius: "50%",
                      border: "solid 1px black",
                      WebkitBoxReflect:
                        "below 0 -webkit-gradient(linear, right top, right bottom, from(transparent), to(rgba(255, 255, 255, 0.4)))",
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "85vh",
                background:
                  "linear-gradient(160deg, #281e67, #2c2b65, #2e2e62, #47455d, #4a817f, #4c535d, #494d58, #46454a, #484848, #313130, #020307)",
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{
                  mt: "35px",
                  width: "500px",
                  height: "500px",
                  position: "absolute",
                  opacity: "0.3",
                }}
              />
              <Box
                sx={{
                  mb: "100px",
                  textAlign: "center",
                  zIndex: 1,
                }}
              >
                <Typography
                  component="h3"
                  variant="h3"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "bolder",
                    color: "#fff",
                  }}
                >
                  ACCOUNT{"\u00A0\u00A0"}LOGIN
                </Typography>

                <Typography
                  sx={{
                    color: "#fe8383",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  {error}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItem: "center",
                  justifyContent: "space-between",
                  zIndex: 1,
                }}
              >
                <TextField
                  id="username"
                  placeholder="Email Address"
                  variant="outlined"
                  disabled={loading}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                  sx={{ width: "24vw", mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle
                          sx={{
                            color: "#606468",
                            borderRadius: "2px 0px 0px 2px",
                            height: "25px",
                            mr: "10px",
                            backgroundColor: "#363b41",
                            boxShadow: "0 0 0 13px #363b41",
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      backgroundColor: "#41484f",
                      color: "white",
                      borderRadius: "7px",
                    },
                  }}
                />
                <TextField
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ width: "24vw", mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon
                          sx={{
                            color: "#606468",
                            borderRadius: "2px 0px 0px 2px",
                            height: "25px",
                            mr: "10px",
                            backgroundColor: "#363b41",
                            boxShadow: "0 0 0 13px #363b41",
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onKeyPress={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityIcon size={18} sx={{ color: "#606468" }} />
                        ) : (
                          <VisibilityOffIcon
                            size={18}
                            sx={{ color: "#606468" }}
                          />
                        )}
                      </IconButton>
                    ),
                    sx: {
                      backgroundColor: "#41484f",
                      color: "white",
                      borderRadius: "7px",
                    },
                  }}
                />
                <Button
                  className="custom-btn btn-15"
                  id="login-btn"
                  type="submit"
                  variant="contained"
                  sx={{
                    mb: "15px",
                    backgroundColor: "#d61f26",
                    borderRadius: "7px",
                    color: "#fff",
                    fontSize: "15px",
                    width: "24vw",
                    height: "50px",
                    "&:hover": {
                      backgroundColor: "#006aff",
                    },
                  }}
                >
                  Sign In
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#fff",
                      m: 0,
                      mr: "10px",
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#fff",
                        m: 0,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Click Here
                      <ForwardRoundedIcon
                        sx={{
                          fontSize: "20px",
                          ml: "3px",
                          my: "-6px",
                        }}
                      />
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

LoginModal.defaultProps = {
  handleClose: () => {},
  logo: "",
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  logo: PropTypes.string,
};
