import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddSupplierModal from "modal/Procurement/ProcurementLibraries/AddSupplierModal";
import procurementService from "services/procurement-service";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import themes from "themes/theme";

const { tokens } = themes;

function SupplierLibraries() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [suppliers, setSuppliers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openSupplierModal, setOpenSupplierModal] = useState(false);

  const moduleName = "supplier";

  const handleAddSupplier = () => {
    setOpenSupplierModal(true);
  };

  const handleCloseSupplier = () => {
    setOpenSupplierModal(false);
  };

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setSuppliers(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone_no",
      headerName: "Phone",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      flex: 0.5,
    },
    {
      field: "mobile_no",
      headerName: "Mobile",
      flex: 0.5,
    },
    {
      field: "tin_no",
      headerName: "TIN No.",
      flex: 0.5,
    },
  ];

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <Box sx={{ m: "15px 20px 20px 20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Button
          onClick={handleAddSupplier}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 150,
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
          Add Supplier
        </Button>
      </Box>
      <Divider>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Suppliers/Vendors
        </Typography>
      </Divider>

      <AddSupplierModal
        open={openSupplierModal}
        handleClose={handleCloseSupplier}
        onSuccess={() => {
          setOpenSupplierModal(false);
          handleGetAll();
        }}
      />
      <Box>
        <EditableTable
          data={suppliers}
          columns={columns}
          loadingState={loading}
          checkbox={false}
          remove
        />
      </Box>
    </Box>
  );
}

export default SupplierLibraries;
