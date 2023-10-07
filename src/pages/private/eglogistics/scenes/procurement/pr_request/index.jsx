import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ForwardIcon from "@mui/icons-material/Forward";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddPRModal from "modal/Procurement/PurchaseRequest/AddPRModal";
import AddPODetailsModal from "modal/Procurement/PurchaseRequest/AddPODetailsModal";
import PrOrderReceiptModal from "modal/Procurement/PRReceipts/PrOrderReceiptModal";
import procurementService from "services/procurement-service";
import Header from "components/PrivateComponents/eglogistics/Header";
import themes from "themes/theme";
import SnackbarComponent from "components/PrivateComponents/SnackBarComponent";
import PurchaseRequestTable from "./prrequestTable";

const moduleName = "purchase";
const processType = "request";

const { tokens } = themes;

export default function PurchaseRequest() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // ito ung kumukuha ng mga rows na naselect sa table para maidisplay ung total
  const [selectedPR, setSelectedPR] = useState([]);

  // ito ung naghahahandle ng mga items sa modal
  const [PRItems, setPRItems] = useState();

  // ito ung kumukuha ng data mula sa api para mailagay sa table
  const [data, setData] = useState([]);

  // ito ung naghahahandle ng nakastructure na na object para maipost sa purchaseRequest
  const [PRValues, setPRValues] = useState();

  const [allPrItems, setAllPrItems] = useState();

  const [PODetails, setPODetails] = useState({});

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [openPODetailsModal, setOpenPODetailsModal] = useState(false);
  const [openPRRequestModal, setOpenPRRequestModal] = useState(false);
  const [openPoReceipt, setOpenPoReceipt] = useState(false);

  const handleAddPODetails = () => {
    setOpenPODetailsModal(true);
  };

  const handleClosePODetails = () => {
    setOpenPODetailsModal(false);
  };

  const handleOpenPoReceipt = () => {
    setOpenPoReceipt(true);
  };

  const handleClosePoReceipt = () => {
    setOpenPoReceipt(false);
  };

  const handleOpenAddPR = () => {
    setOpenPRRequestModal(true);
  };

  const handleCloseAddPR = () => {
    setOpenPRRequestModal(false);
    setError("");
  };

  const handlePRChange = (newPR) => {
    setPRItems(newPR);
  };

  // ito ung kumukuha ng data para madisplay sa table
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

  // ito ung kumukuha ng items ng isang purchase
  const handleGetAllItems = () => {
    setError("");
    setLoading(true);
    procurementService
      .getAllItemsAPI(moduleName, selectedPR[0]?.pr_code)
      .then((e) => {
        setAllPrItems(e);
      })
      .catch((err) => {
        setOpenError(true);
        setError(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ito ung nagaadd ng purchase request manually.. galing sa modal.. di galing sa table
  const handleSubmit = () => {
    setError("");
    setLoading(true);

    procurementService
      .addAPI(PRValues, moduleName)
      .then(() => {
        setOpenPRRequestModal(false);
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

  // ito ung naguupdate ng process type to order
  const handleProceedToOrder = () => {
    setError("");
    setLoading(true);

    procurementService
      .updateAPI(
        selectedPR[0].uuid,
        {
          process_type: "order",
          order_due_date: PODetails.dueDate,
          terms_of_agreement: PODetails.TOA,
        },
        moduleName
      )
      .then(() => {
        handleGetAll();
        handleGetAllItems();
        handleOpenPoReceipt();
        setOpenPODetailsModal(false);
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
    if (!selectedPR?.length) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedPR]);

  const handleTotal = (evt) => {
    // Use reduce to calculate the total sum of total_amount in the compute array
    const total = evt?.reduce(
      (acc, item) => acc + item.total_amount * item.quantity,
      0
    );
    return total || 0;
  };

  const handleDisplayTotal = (evt) => {
    // Use reduce to calculate the total sum of total_amount in the compute array
    const total = evt?.reduce((acc, item) => acc + item.total_amount, 0);
    return total || 0;
  };

  const handleTotalWithTax = () => {
    const subTotal = handleTotal(allPrItems);
    const taxAmount = subTotal * 0.14;
    const totalAmount = subTotal + taxAmount;
    return totalAmount;
  };

  return (
    <Box sx={{ m: "-5px 20px 20px 20px" }}>
      <AddPODetailsModal
        open={openPODetailsModal}
        handleClose={handleClosePODetails}
        POOtherDetails={setPODetails}
        handleSubmit={handleProceedToOrder}
      />
      <PrOrderReceiptModal
        totalValue={{
          total: handleTotal(allPrItems),
          subTotal: handleTotalWithTax(),
        }}
        poReceiptData={allPrItems}
        handleClose={handleClosePoReceipt}
        open={openPoReceipt}
      />
      <AddPRModal
        data={PRItems}
        open={openPRRequestModal}
        handleClose={handleCloseAddPR}
        onPRChange={handlePRChange}
        setPRValues={setPRValues}
        onSubmit={handleSubmit}
        error={error}
      />
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: "20px" }}
      >
        <Header
          title="Purchase Request"
          subtitle="List of Transactions Requested from Suppliers"
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <Button
            onClick={handleOpenAddPR}
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
            Add Request
          </Button>
        </Box>
        <Divider>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
            }}
          >
            Purchase Request
          </Typography>
        </Divider>
        <PurchaseRequestTable
          data={data}
          selectedData={setSelectedPR}
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
              Selected ({selectedPR ? selectedPR?.length : 0}{" "}
              {selectedPR?.length > 1 ? "items" : "item"}
              ): <span style={{ fontSize: "15px" }}>₱</span>{" "}
              {selectedPR
                ? selectedPR?.reduce(
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
              {data ? handleDisplayTotal(data) : 0}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography color="gray">Select a request to proceed</Typography>
            <Button
              disabled={disabled}
              onClick={handleAddPODetails}
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
              Place Order
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
