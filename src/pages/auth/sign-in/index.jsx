/* eslint-disable react/destructuring-assignment */
import { useContext, useState } from "react";
import "./sign-in.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import accountService from "../../../services/account-service";
import loginValidation, { initialLog } from "../../../validation/login";
import themes from "../../../themes/theme";

const { ColorModeContext } = themes;

function Login() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const { setAuth } = useStateContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState();
  const [errMessage, setError] = useState();
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
          if (
            res.data.role === "superadmin" ||
            res.data.role === "planner" ||
            res.data.role === "reviewer" ||
            res.data.role === "uploader"
          ) {
            navigate("/dashboard");
          } else if (res.data.role === "hradmin") {
            navigate("/hrdashboard");
          } else {
            navigate("/pictudashboard");
          }
        }
      } catch (err) {
        let message = "";
        if (err?.response?.status === 404) {
          message = "err.response.data.error";
        } else if (err?.response?.status === 401) {
          message = err.response.data.error;
        } else if (err?.response?.status === 500) {
          message = "Internal Server Error";
        } else {
          message = "An error occurred";
        }
        setError(message || err?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Grid className="login">
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          background: (themeMode) =>
            themeMode.palette.mode === "dark"
              ? "linear-gradient(rgba(26, 41, 31, 0.7), rgba(15, 24, 20, 0.7))"
              : "linear-gradient(rgba(57, 114, 70, 0.7), rgba(55, 91, 75, 0.7))",
        }}
      />
      <Box
        sx={{ position: "fixed", bottom: "40px", left: "40px", zIndex: 2000 }}
      >
        <Button
          type="button"
          onClick={colorMode.toggleColorMode}
          sx={{
            midWidth: 0,
            height: "55px",
            width: "40px",
            borderRadius: "50%",
            padding: 0,
            backgroundColor: "lightgray",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "lightgreen",
            },
          }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </Button>
      </Box>
      <Box
        sx={{
          top: 0,
          left: 0,
          width: "50vw",
          height: "100vh",
          clipPath: "polygon(0 0, 80% 0, 100% 100%, 0 100%, 0 80%)",
          background: (themeMode) =>
            themeMode.palette.mode === "dark"
              ? "rgba(20, 27, 45, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
        }}
      >
        <form
          className="login-form"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
          <Box
            className="header"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              background: (themeMode) =>
                themeMode.palette.mode === "dark"
                  ? "linear-gradient(-160deg, rgba(114, 135, 227, 0.9), rgba(238, 255, 0, 0.8), rgba(255, 0, 0, 0.8))"
                  : "transparent",
              p: "3px 10px 10px 10px",
              borderRadius: "50%",
            }}
          >
            {/* <Box
              className="logo"
              component="img"
              src={Logo}
              alt="Logo"
              height="150px"
              width="150px"
            /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: (themeMode) =>
                  themeMode.palette.mode === "dark" ? "#e0e0e0" : "black",
                fontWeight: "bolder",
              }}
            >
              Philippine Fiber Industry <br /> Development Authority
            </Typography>
          </Box>

          <Typography
            sx={{ color: "red", fontWeight: "bolder", fontSize: "20px" }}
          >
            {errMessage}
          </Typography>
          <TextField
            id="username"
            placeholder="Username"
            variant="standard"
            disabled={loading}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBLur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ width: "18vw" }}
          />
          <TextField
            id="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            variant="standard"
            fullWidth
            disabled={loading}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowPassword(!showPassword)}
                  onKeyPress={() => setShowPassword(!showPassword)}
                  sx={{
                    margin: 0,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                >
                  {showPassword ? (
                    <VisibilityIcon size={18} />
                  ) : (
                    <VisibilityOffIcon size={18} />
                  )}
                </Box>
              ),
            }}
            onBlur={formik.handleBLur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ width: "18vw" }}
          />

          <Button
            id="login-btn"
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#067a61",
              color: "#fff",
              fontSize: "15px",
              padding: "8px 5px",
              margintop: "15px",
              width: "250px",
              height: "40px",
              "&:hover": {
                backgroundColor: "#0ed145",
                color: "black",
                fontWeight: "bolder",
              },
            }}
          >
            Log in
          </Button>
          <Link to="/">
            <Typography
              sx={{
                color: (themeMode) =>
                  themeMode.palette.mode === "dark" ? "lightblue" : "blue",
                fontSize: "14px",
                m: 0,
                "&:hover": {
                  fontWeight: "bold",
                },
              }}
            >
              Not a PhilFIDA member? Click Here
            </Typography>
          </Link>
        </form>
      </Box>
    </Grid>
  );
}

export default Login;
