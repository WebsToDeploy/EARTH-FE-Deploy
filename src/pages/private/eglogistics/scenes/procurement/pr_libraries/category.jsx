import { useEffect, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCategoryModal from "modal/Procurement/ProcurementLibraries/AddCategoryModal";
import procurementService from "services/procurement-service";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import themes from "themes/theme";

const { tokens } = themes;

function CategoryLibraries() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const moduleName = "category";

  const handleAddItem = () => {
    setOpenCategoryModal(true);
  };

  const handleCloseItem = () => {
    setOpenCategoryModal(false);
  };

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setCategories(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
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
          Add Category
        </Button>
      </Box>
      <Divider>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Categories
        </Typography>
      </Divider>
      <AddCategoryModal
        open={openCategoryModal}
        handleClose={handleCloseItem}
        onSuccess={() => {
          setOpenCategoryModal(false);
          handleGetAll();
        }}
      />
      <Box>
        <EditableTable
          data={categories}
          columns={columns}
          loadingState={loading}
          checkbox={false}
          remove
        />
      </Box>
    </Box>
  );
}

export default CategoryLibraries;
