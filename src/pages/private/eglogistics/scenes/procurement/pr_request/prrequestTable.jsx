/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import themes from "themes/theme";

const { tokens } = themes;

// Function to format a date to "MM-DD-YY" format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString(); // Get the last two digits of the year
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}-${day}-${year}`;
};

export default function PurchaseRequestTable({
  data,
  selectedData,
  loadingState,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedPR, setSelectedPR] = useState();

  selectedData(selectedPR);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const columns = [
    {
      field: "request_date",
      headerName: "Date",
      flex: 1,
      // editable: true,
      type: "date",
      valueFormatter: (params) => formatDate(params.value), // Format the date
    },
    {
      field: "pr_code",
      headerName: "PR No.",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "company_name",
      headerName: "Company Name",
      flex: 1,
    },
    {
      field: "item_count",
      headerName: "Items",
      flex: 1,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "attention",
      headerName: "Attention",
      flex: 1,
      editable: true,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      editable: true,
    },
    {
      field: "pr_status",
      headerName: "Status",
      flex: 1,
      editable: true,
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["pending", "incomplete", "complete"],
      renderCell: ({ row: { pr_status } }) => (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="15px"
          backgroundColor={
            pr_status === "pending"
              ? colors.blueAccent[700]
              : pr_status === "incomplete"
              ? colors.greenAccent[700]
              : pr_status === "complete"
              ? colors.grey[700]
              : colors.grey[700]
          }
        >
          {pr_status === "pending" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <AutorenewOutlinedIcon />
            </Box>
          )}
          {pr_status === "incomplete" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <RuleOutlinedIcon />
            </Box>
          )}
          {pr_status === "complete" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <ChecklistOutlinedIcon />
            </Box>
          )}
          <span color={colors.grey[100]} style={{ ml: "5px" }}>
            {pr_status}
          </span>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <EditableTable
        data={data}
        columns={columns}
        checkbox={true}
        selectedData={setSelectedPR}
        loadingState={loadingState}
        singleSelect={true}
        height="60vh"
        remove
        view
        form
      />
    </Box>
  );
}

PurchaseRequestTable.defaultProps = {
  data: [],
  selectedData: () => {},
  loadingState: false,
};

PurchaseRequestTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  selectedData: PropTypes.func,
  loadingState: PropTypes.bool,
};
