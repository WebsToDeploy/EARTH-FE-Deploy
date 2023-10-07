/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditableTable from "components/PrivateComponents/eglogistics/Tables/EditableTable";
import themes from "themes/theme";

const { tokens } = themes;

export default function AccountsTable({
  accountData,
  loadingState,
  rowToUpdate,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [toBeUpdate, setToBeUpdated] = useState([]);

  rowToUpdate(toBeUpdate);

  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "firstname",
      headerName: "Firstname",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "lastname",
      headerName: "Lastname",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      headerAlign: "center",
      editable: true,
      type: "singleSelect",
      valueOptions: ["superadmin", "canvasser", "user"],
      renderCell: ({ row: { role } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="15px"
          backgroundColor={
            role === "superadmin"
              ? colors.blueAccent[700]
              : role === "canvasser"
              ? colors.greenAccent[700]
              : role === "user"
              ? colors.grey[700]
              : colors.grey[700]
          }
        >
          {role === "superadmin" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <SecurityIcon />
            </Box>
          )}
          {role === "canvasser" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <VerifiedUserIcon />
            </Box>
          )}
          {role === "user" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <LockOpenIcon />
            </Box>
          )}
          <span color={colors.grey[100]} style={{ ml: "5px" }}>
            {role}
          </span>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Activate", "Deactivate"],
      renderCell: ({ row: { status } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="15px"
          backgroundColor={
            status === 1
              ? colors.greenAccent[700]
              : status === 0
              ? colors.redAccent[700]
              : colors.grey[700]
          }
        >
          {status === 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <CheckCircleOutlineOutlinedIcon />
            </Box>
          )}
          {status === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <CancelOutlinedIcon />
            </Box>
          )}
          <span color={colors.grey[100]} style={{ ml: "5px" }}>
            {status === 1 ? "Active" : status === 0 ? "Deactivated" : "unknown"}
          </span>
        </Box>
      ),
      valueGetter: (params) =>
        params.row.status === 1 ? "Activate" : "Deactivate",
      onEditCellChange: (params, event) => {
        // Handle changes in the cell's value here
        const newValue = event.target.value;
        params.api.updateRows([
          { ...params.row, status: newValue === "Activate" ? 1 : 0 },
        ]);
      },
    },
  ];

  return (
    <Box>
      <EditableTable
        data={accountData}
        columns={columns}
        loadingState={loadingState}
        rowToUpdate={setToBeUpdated}
        height="79vh"
        showSearch
        selectedData
        // reset={false}
      />
    </Box>
  );
}

AccountsTable.defaultProps = {
  accountData: [],
  loadingState: false,
  rowToUpdate: [],
};

AccountsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  accountData: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  rowToUpdate: PropTypes.arrayOf(PropTypes.object),
};
