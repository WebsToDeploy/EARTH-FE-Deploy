/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";
import { Tooltip, useTheme } from "@mui/material";
import themes from "../../../../themes/theme";

const { tokens } = themes;

export default function EditableTable({
  data,
  columns,
  loadingState,
  checkbox,
  height,
  showSearch,
  selectedData,
  rowToUpdate,
  singleSelect,
  reset,
  remove,
  view,
  form,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState(data);
  const [rowModesModel, setRowModesModel] = useState({});

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (ids) => {
    if (ids.length === 0) {
      setSelectedRows([]);
      selectedData([]);
    } else {
      const cartArray = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const selectedId of ids) {
        // Find the row with the matching ID and push it to the selectedRows array
        const selectedRow = data.find((row) => row.uuid === selectedId);
        if (selectedRow) {
          setSelectedRows(ids);
          cartArray.push(selectedRow);
        }
      }
      selectedData(cartArray);
    }
  };

  const handleSingleRowSelection = (newSelection) => {
    if (newSelection.length === 0) {
      setSelectedRows([]);
      selectedData([]);
    } else {
      setSelectedRows([newSelection[0]]);
      const selectedRow = data.find((row) => row.uuid === newSelection[0]);
      selectedData([selectedRow]);
    }
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (uuid) => () => {
    setRowModesModel({ ...rowModesModel, [uuid]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (uuid) => () => {
    setRowModesModel({ ...rowModesModel, [uuid]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (uuid) => () => {
    setRows(rows.filter((row) => row.uuid !== uuid));
  };

  const handleCancelClick = (uuid) => () => {
    setRowModesModel({
      ...rowModesModel,
      [uuid]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.uuid === uuid);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.uuid !== uuid));
    }
  };

  const processRowUpdate = (newRow) => {
    let updatedRow = {};

    if (newRow.status) {
      let status = 0;
      if (newRow.status === "Activate") {
        status = 1;
      }
      updatedRow = { ...newRow, status, isNew: false };
    } else {
      updatedRow = { ...newRow, isNew: false };
    }

    if (newRow.quantity) {
      rowToUpdate(updatedRow);
    }

    rowToUpdate(updatedRow); // kukunin yung row

    setRows(rows.map((row) => (row.uuid === newRow.uuid ? updatedRow : row)));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columnsAction = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 140,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title="Save" placement="top">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancel" placement="top">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        }

        return [
          view ? (
            <Tooltip title="Items" placement="top">
              <GridActionsCellItem
                icon={<ListAltIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>
          ) : (
            <div />
          ),
          form ? (
            <Tooltip title="Form" placement="top">
              <GridActionsCellItem
                icon={<ReceiptLongIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>
          ) : (
            <div />
          ),
          <Tooltip title="Edit" placement="top">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
          remove ? (
            <Tooltip title="Remove" placement="top">
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />
            </Tooltip>
          ) : (
            <div />
          ),
        ];
      },
    },
  ];

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    if (reset) {
      setSelectedRows([]);
      selectedData([]);
    }
  }, [reset]);

  return (
    <Box
      height={height}
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        // "& .MuiDataGrid-cell": {
        //   borderBottom: "none",
        // },
        "& .name-column--cell": {
          color: colors.blueAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          color: colors.grey[900],
          backgroundColor: colors.blueAccent[300],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          // virtualScroller is the inside of dataGrid
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.primary[400],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.blueAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
        marginTop: "5px",
      }}
    >
      <DataGrid
        getRowId={(row) => row.uuid || row.id}
        rows={rows}
        columns={columnsAction}
        editMode="row"
        checkboxSelection={checkbox}
        loading={loadingState}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={
          singleSelect ? handleSingleRowSelection : handleRowSelect
        }
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: showSearch,
            quickFilterProps: { debounceMs: 500 },
            setRows,
            setRowModesModel,
          },
        }}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        initialState={{
          pinnedColumns: { left: ["name"], right: ["actions"] },
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick // para di magloop si params
        hideFooterSelectedRowCount
        height="100%"
      />
    </Box>
  );
}

EditableTable.defaultProps = {
  data: [],
  columns: [],
  loadingState: false,
  checkbox: false,
  height: "70vh",
  showSearch: true,
  selectedData: [],
  rowToUpdate: [],
  singleSelect: false,
  reset: false,
  remove: false,
  view: false,
  form: false,
};

EditableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  loadingState: PropTypes.bool,
  checkbox: PropTypes.bool,
  height: PropTypes.string,
  showSearch: PropTypes.bool,
  selectedData: PropTypes.arrayOf(PropTypes.object),
  rowToUpdate: PropTypes.arrayOf(PropTypes.object),
  singleSelect: PropTypes.bool,
  reset: PropTypes.bool,
  remove: PropTypes.bool,
  view: PropTypes.bool,
  form: PropTypes.bool,
};
