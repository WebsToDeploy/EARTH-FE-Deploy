import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
import procurementService from "services/procurement-service";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import themes from "../../../themes/theme";

const style = {
  backgroundColor: (themeMode) =>
    themeMode.palette.mode === "dark" ? "#1f2a40" : "#fff",
  position: "absolute",
  top: "50%",
  left: "57%",
  transform: "translate(-50%, -50%)",
  height: "86vh",
  width: "80vw",
  boxShadow: 24,
  p: 4,
};

const { tokens } = themes;

export default function CanvassCart({
  open,
  handleClose,
  cartTotal,
  updateTable,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const moduleName = "canvass";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setData(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  useEffect(() => {
    if (updateTable) {
      handleGetAll();
    }
  }, [updateTable]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "item_code",
      headerName: "Item Code",
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 0.5,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      flex: 0.5,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
      type: "number",
      editable: true,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        // setError("");
      }}
    >
      <Box sx={style}>
        <Divider>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
            }}
          >
            Canvass Cart
          </Typography>
        </Divider>
        <EditableTable
          data={data}
          columns={columns}
          loadingState={loading}
          checkbox
          height="70vh"
          showSearch
          // selectedData
          // reset={false}
        />
        <Divider
          variant="middle"
          sx={{ borderTopWidth: "1px", borderTopColor: "grey" }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: "1em",
          }}
        >
          <Typography
            fontSize="medium"
            fontWeight="900"
            color={colors.blueAccent[300]}
            sx={{ letterSpacing: "0.05em", fontFamily: "Poppins, sans-serif" }}
          >
            Subtotal Price ({cartTotal ? cartTotal.items : 0}):{" "}
            <span style={{ fontSize: "18px" }}>₱</span>{" "}
            {cartTotal ? cartTotal.total_price : 0}
          </Typography>
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
              borderRadius: "5px",
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <ForwardIcon sx={{ mr: "10px" }} />
            Place Request
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

CanvassCart.defaultProps = {
  handleClose: () => {},
  // onSuccess: () => {},
  cartTotal: {},
  updateTable: false,
};

CanvassCart.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  // onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  cartTotal: PropTypes.object,
  updateTable: PropTypes.bool,
};
