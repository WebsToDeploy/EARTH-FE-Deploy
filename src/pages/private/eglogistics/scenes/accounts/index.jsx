import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import accountService from "services/account-service";
import AddIcon from "@mui/icons-material/Add";
import RegisterModal from "modal/RegisterModal";
import SnackbarComponent from "components/PrivateComponents/SnackBarComponent";
import themes from "themes/theme";
import AccountsTable from "./accountsTable";

const { tokens } = themes;

export default function Accounts() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toBeUpdated, setToBeUpdated] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetAll = () => {
    setLoading(true);
    accountService
      .getAllUsers()
      .then((e) => {
        setData(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (row) => {
    setLoading(true);
    accountService
      .updateUser(row.uuid, {
        firstname: row.firstname,
        lastname: row.lastname,
        role: row.role,
        status: row.status,
      })
      .then(() => {
        handleGetAll();
        setOpenSuccess(true);
      })
      .catch(() => {
        setOpenError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    if (toBeUpdated?.length !== 0) {
      handleUpdate(toBeUpdated);
    }
  }, [toBeUpdated]);

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
    <Box sx={{ m: "20px" }}>
      <RegisterModal handleClose={handleClose} open={open} />
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
            ADD ACCOUNT
          </Button>
        </Box>

        <Divider>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
            }}
          >
            User Accounts
          </Typography>
        </Divider>

        <Box>
          <AccountsTable
            accountData={data}
            loadingState={loading}
            rowToUpdate={setToBeUpdated}
          />
        </Box>
        {/* Contents */}
      </Box>
      <SnackbarComponent
        open={openSuccess}
        onClose={handleCloseSuccess}
        severity="success"
        message="Updated Successfully."
      />
      <SnackbarComponent
        open={openError}
        onClose={handleCloseError}
        severity="error"
        message="Updating Failed."
      />
    </Box>
  );
}
