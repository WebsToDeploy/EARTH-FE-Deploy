import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBrandModal from "modal/Procurement/ProcurementLibraries/AddBrandModal";
import procurementService from "services/procurement-service";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import themes from "themes/theme";

const { tokens } = themes;

function BrandLibraries() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openBrandModal, setOpenBrandModal] = useState(false);

  const moduleName = "brand";

  const handleAddBrand = () => {
    setOpenBrandModal(true);
  };

  const handleCloseItem = () => {
    setOpenBrandModal(false);
  };

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setBrands(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to format a date to "MM-DD-YY" format
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear().toString(); // Get the last two digits of the year
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  //   const day = date.getDate().toString().padStart(2, "0");
  //   return `${month}-${day}-${year}`;
  // };

  const columns = [
    {
      field: "name",
      headerName: "Brand name",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "created_at",
    //   headerName: "Created Date",
    //   flex: 0.5,
    //   valueFormatter: (params) => formatDate(params.value), // Format the date
    // },
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
          onClick={handleAddBrand}
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
          Add Brand
        </Button>
      </Box>
      <Divider>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Brands
        </Typography>
      </Divider>
      <AddBrandModal
        open={openBrandModal}
        handleClose={handleCloseItem}
        onSuccess={() => {
          setOpenBrandModal(false);
          handleGetAll();
        }}
      />
      <Box>
        <EditableTable
          data={brands}
          columns={columns}
          loadingState={loading}
          checkbox={false}
          remove
        />
      </Box>
    </Box>
  );
}

export default BrandLibraries;
