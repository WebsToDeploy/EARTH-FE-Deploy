import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, Typography } from "@mui/material";
import procurementService from "services/procurement-service";
import DataGrid from "components/PrivateComponents/eglogistics/Tables/DataGrid";

function CanvasTable({
  selectedData,
  reset,
  category,
  brand,
  supplier,
  priceRage,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(
        "product",
        category,
        brand,
        supplier,
        priceRage[0],
        priceRage[1]
      )
      .then((e) => {
        setItems(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    selectedData(data);
  }, [data]);

  useEffect(() => {
    handleGetAll();
  }, [category, brand, supplier, priceRage]);

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
    },
    {
      field: "item_code",
      headerName: "Item Code",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "brand_name",
      headerName: "Brand",
      flex: 0.5,
    },
    {
      field: "category_name",
      headerName: "Category",
      flex: 0.5,
    },
    {
      field: "supplier_name",
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
      field: "phone_no",
      headerName: "Phone",
      headerAlign: "left",
      flex: 0.5,
    },
    {
      field: "mobile_no",
      headerName: "Mobile",
      headerAlign: "left",
      flex: 0.5,
    },
    {
      field: "tin_no",
      headerName: "TIN",
      headerAlign: "left",
      flex: 0.5,
    },
  ];

  return (
    <Box sx={{ m: "15px 20px 20px 20px" }}>
      <Divider>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "25px",
          }}
        >
          Item Supplies
        </Typography>
      </Divider>
      <Box>
        <DataGrid
          data={items}
          columns={columns}
          loadingState={loading}
          checkbox
          selectedData={setData}
          reset={reset}
        />
      </Box>
    </Box>
  );
}

export default CanvasTable;

CanvasTable.defaultProps = {
  selectedData: [],
  reset: false,
  category: null,
  brand: null,
  supplier: null,
  priceRage: [],
};

CanvasTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedData: PropTypes.arrayOf(PropTypes.object),
  reset: PropTypes.bool,
  category: PropTypes.number,
  brand: PropTypes.number,
  supplier: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  priceRage: PropTypes.array,
};
