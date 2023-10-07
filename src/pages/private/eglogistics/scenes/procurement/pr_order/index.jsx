import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ForwardIcon from "@mui/icons-material/Forward";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PurchaseOrderModal from "modal/Procurement/PurchaseOrder/AddPoModal";
import Header from "components/PrivateComponents/eglogistics/Header";
import themes from "themes/theme";
import procurementService from "services/procurement-service";
import SnackbarComponent from "components/PrivateComponents/SnackBarComponent";
import PurchaseOrderTable from "./prorderTable";

const { tokens } = themes;

const moduleName = "purchase";

export default function PurchaseOrder() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [selectedPO, setSelectedPO] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName, "order")
      .then((e) => {
        setData(e);
      })
      .catch((err) => {
        setError(err?.message);
        setOpenError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleProceedToTransmittal = () => {
    setError("");
    setLoading(true);

    procurementService
      .updateAPI(
        selectedPO[0].uuid,
        { process_type: "transmittal" },
        moduleName
      )
      .then(() => {
        handleGetAll();
        setOpenSuccess(true);
        setData([]);
      })
      .catch((err) => {
        setError(err?.message);
        setOpenError(true);
      })
      .finally(() => {
        setLoading(false);
      });
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

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    if (!selectedPO?.length) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedPO]);

  const handleTotal = (evt) => {
    // Use reduce to calculate the total sum of total_amount in the compute array
    const total = evt?.reduce((acc, item) => acc + item.total_amount, 0);
    return total || 0;
  };

  return (
    <Box sx={{ m: "-5px 20px 20px 20px" }}>
      <PurchaseOrderModal handleClose={handleClose} open={open} />
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: "20px" }}
      >
        <Header title="Purchase Order" subtitle="Purchase order subtitle" />

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <Button
            onClick={handleOpen}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 200,
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: (themeMode) =>
                themeMode.palette.mode === "dark" ? "#334b5f" : "lightgray",
              color: colors.grey[100],
              "&:hover": {
                textShadow: "0 0 0.5rem rgba(255, 255, 255, 0.75)",
                color: "#fff",
                backgroundColor: "gray",
              },
            }}
          >
            <AddIcon sx={{ mr: 0.5 }} />
            Purchase Order
          </Button>
        </Box>

        <Divider>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
            }}
          >
            Purchase Order
          </Typography>
        </Divider>
        <PurchaseOrderTable
          data={data}
          selectedData={setSelectedPO}
          loadingState={loading}
        />
        <Divider
          variant="middle"
          sx={{ borderTopWidth: "1px", borderTopColor: "grey" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box>
            <Typography sx={{ letterSpacing: "0.05em", fontSize: "15px" }}>
              {/* Selected: <br /> <b> {handleTotal(PR)}</b> */}
              Selected ({selectedPO ? selectedPO?.length : 0}{" "}
              {selectedPO?.length > 1 ? "items" : "item"}
              ): <span style={{ fontSize: "15px" }}>₱</span>{" "}
              {selectedPO
                ? selectedPO?.reduce(
                    (total, currentItem) =>
                      total + (currentItem.total_amount || 0),
                    0
                  )
                : 0}
            </Typography>
            <Typography
              color={colors.blueAccent[300]}
              fontWeight="bold"
              sx={{
                letterSpacing: "0.05em",
                textAlign: "right",
                fontSize: "15px",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Subtotal Amount ({data ? `${data.length} items` : "0 item"}):{" "}
              <span style={{ fontSize: "18px" }}>₱</span>{" "}
              {data ? handleTotal(data) : 0}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography color="gray">Select an order to proceed</Typography>
            <Button
              disabled={disabled}
              onClick={handleProceedToTransmittal}
              sx={{
                backgroundColor: disabled
                  ? colors.blueAccent[800]
                  : colors.blueAccent[300],
                color: colors.grey[900],
                "&:hover": {
                  color: "white",
                  backgroundColor: colors.blueAccent[700],
                },
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <ForwardIcon sx={{ mr: "10px" }} />
              Transmit
            </Button>
          </Box>
        </Box>
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
