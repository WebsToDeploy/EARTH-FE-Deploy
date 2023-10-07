import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddItemModal from "modal/Procurement/ProcurementLibraries/AddItemModal";
import procurementService from "services/procurement-service";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import themes from "themes/theme";

const { tokens } = themes;

function Products() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);

  const moduleName = "product";

  const handleAddItem = () => {
    setOpenItemModal(true);
  };

  const handleCloseItem = () => {
    setOpenItemModal(false);
  };

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setItems(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "item_code",
      headerName: "Item Code",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "brand_name",
      headerName: "Brand",
      width: 200,
    },
    {
      field: "category_name",
      headerName: "Category",
      width: 200,
    },
    {
      field: "supplier_name",
      headerName: "Supplier",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      align: "left",
      width: 200,
    },
  ];

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <Box sx={{ m: "15px 20px 20px 20px" }}>
      <AddItemModal
        open={openItemModal}
        handleClose={handleCloseItem}
        onSuccess={() => {
          setOpenItemModal(false);
          handleGetAll();
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Button
          onClick={handleAddItem}
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
          Add Product
        </Button>
      </Box>
      <Divider>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Products
        </Typography>
      </Divider>
      <Box>
        <EditableTable
          data={items}
          columns={columns}
          loadingState={loading}
          checkbox={false}
          remove
        />
      </Box>
    </Box>
  );
}

export default Products;
