import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import procurementService from "services/procurement-service";
import Header from "components/PrivateComponents/eglogistics/Header";
import SnackbarComponent from "components/PrivateComponents/SnackBarComponent";
import themes from "../../../../../../themes/theme";
import TransmittalTable from "./transmittalTable";

const { tokens } = themes;
const moduleName = "purchase";
const processType = "transmittal";

export default function Transmittal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleGetAll = () => {
    setError("");
    setLoading(true);
    procurementService
      .getAllAPI(moduleName, processType)
      .then((e) => {
        setData(e);
      })
      .catch((err) => {
        setOpenError(true);
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

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
    <Box sx={{ m: "-5px 20px 20px 20px" }}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: "20px" }}
      >
        <Header
          title="Transmittal"
          subtitle="List of Transmitted Transactions"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[300],
              // backgroundColor: (themeMode) =>
              //   themeMode.palette.mode === "dark" ? "#334b5f" : "lightgray",
              color: colors.grey[900],
              "&:hover": {
                color: "white",
                backgroundColor: colors.blueAccent[700],
              },
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <Box
        borderRadius="10px"
        boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
        p="1rem"
        sx={{ backgroundColor: colors.primary[400] }}
      >
        <Divider>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
            }}
          >
            Transmittal
          </Typography>
        </Divider>
        <TransmittalTable data={data} loadingState={loading} />
        {/* <Divider
          variant="middle"
          sx={{ borderTopWidth: "1px", borderTopColor: "grey" }}
        /> */}
        <SnackbarComponent
          open={openSuccess}
          onClose={handleCloseSuccess}
          severity="success"
          message="Request Successful."
        />
        <SnackbarComponent
          open={openError}
          onClose={handleCloseError}
          severity="error"
          message={error}
        />
      </Box>
    </Box>
  );
}
