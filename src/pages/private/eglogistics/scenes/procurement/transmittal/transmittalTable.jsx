/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import themes from "themes/theme";

const { tokens } = themes;

export default function TransmittalTable({
  data,
  //   selectedData,
  loadingState,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    // { field: "transmit_date", headerName: "Date", flex: 1, editable: true },
    // {
    //   field: "billing_date",
    //   headerName: "Billing Date",
    //   flex: 1,
    //   editable: true,
    // },
    // { field: "po_code", headerName: "PO No.", flex: 1, editable: true },
    { field: "tf_code", headerName: "TF No.", flex: 1, editable: true },
    {
      field: "company_name",
      headerName: "Company Name",
      flex: 1,
      editable: true,
    },
    {
      field: "item_count",
      headerName: "Item Count",
      flex: 1,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    { field: "purpose", headerName: "Purpose", flex: 1, editable: true },
    { field: "remarks", headerName: "Remarks", flex: 1, editable: true },
    {
      field: "tf_status",
      headerName: "Status",
      flex: 1,
      editable: true,
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["pending", "incomplete", "complete"],
      renderCell: ({ row: { tf_status } }) => (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="15px"
          backgroundColor={
            tf_status === "pending"
              ? colors.blueAccent[700]
              : tf_status === "incomplete"
              ? colors.greenAccent[700]
              : tf_status === "complete"
              ? colors.grey[700]
              : colors.grey[700]
          }
        >
          {tf_status === "pending" && (
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
          {tf_status === "incomplete" && (
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
          {tf_status === "complete" && (
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
            {tf_status}
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
        checkbox
        // selectedData={setData}
        loadingState={loadingState}
        singleSelect
        height="72.4vh"
        remove
        view
        form
      />
    </Box>
  );
}

TransmittalTable.defaultProps = {
  data: [],
  //   selectedData: () => {},
  loadingState: false,
};

TransmittalTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  //   selectedData: PropTypes.func,
  loadingState: PropTypes.bool,
};
