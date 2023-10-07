/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import ClearIcon from "@mui/icons-material/Clear";
import RoofingRoundedIcon from "@mui/icons-material/RoofingRounded";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import { Box, Typography, useTheme } from "@mui/material";
import DataGrid from "../../../../../../components/PrivateComponents/eglogistics/Tables/DataGrid";
import DateField from "../../../../../../components/PrivateComponents/eglogistics/Textfields/Datepicker";
import mockData from "../../../../../../data/mockData";
import themes from "../../../../../../themes/theme";
// import procurementService from "services/procurement-service";

const { tokens } = themes;
const { mockPurchaseRequest } = mockData;

export default function PurchaseRequestTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const [items, setItems] = useState([]);
  //   const [loading, setLoading] = useState(false);

  //   const handleGetAll = () => {
  //     setLoading(true);
  //     procurementService
  //       .getAllAPI("product")
  //       .then((e) => {
  //         setItems(e);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  const columns = [
    {
      field: "uuid",
      headerName: "ID",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },
    {
      field: "name",
      headerName: "NAME",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },
    {
      field: "setting",
      headerName: "SETTING",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { setting } }) => {
        const settingLength = setting.length;
        const dynamicWidth = `calc(${settingLength} * 5px + 65px)`; // You can adjust the multiplier to set the desired width

        return (
          <Box
            width={dynamicWidth}
            m="0 auto"
            // p="2px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="15px"
            border={`3px solid ${
              setting === "WFH"
                ? colors.greenAccent[600]
                : setting === "ON-SITE"
                ? colors.blueAccent[700]
                : colors.redAccent[700]
            }`}
          >
            {setting === "WFH" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: "5px",
                }}
              >
                <RoofingRoundedIcon />
              </Box>
            )}
            {setting === "ON-SITE" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: "5px",
                }}
              >
                <CorporateFareRoundedIcon />
              </Box>
            )}
            <span color={colors.grey[100]} style={{ ml: "5px" }}>
              {setting}
            </span>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "DATE",
      flex: 1,
    },
    {
      field: "clockin",
      headerName: "CLOCK IN",
      flex: 1,
    },
    {
      field: "clockout",
      headerName: "CLOCK OUT",
      flex: 1,
    },
    {
      field: "late",
      headerName: "LATE",
      flex: 1,
      renderCell: ({ row: { late } }) => (
        <span color={late !== "--:--:--" ? "red" : "null"}>{late}</span>
      ),
    },
    {
      field: "undertime",
      headerName: "UNDERTIME",
      flex: 1,
      renderCell: ({ row: { undertime } }) => (
        <span color={undertime !== "--:--:--" ? "#C95000" : "null"}>
          {undertime}
        </span>
      ),
    },
    {
      field: "overtime",
      headerName: "OVERTIME",
      flex: 1,
      renderCell: ({ row: { overtime } }) => (
        <span color={overtime !== "--:--:--" ? "#9100FF" : "null"}>
          {overtime}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { status } }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            status === "Present"
              ? colors.greenAccent[600]
              : status === "Overtime"
              ? colors.blueAccent[700]
              : status === "Late"
              ? colors.grey[700]
              : status === "Absent"
              ? colors.redAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {status === "Present" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <CheckIcon />
            </Box>
          )}
          {status === "Overtime" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <DoneAllIcon />
            </Box>
          )}
          {status === "Late" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <AlarmOnIcon />
            </Box>
          )}
          {status === "Absent" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: "5px",
                mt: "-3px",
              }}
            >
              <ClearIcon />
            </Box>
          )}
          <span color={colors.grey[100]} style={{ ml: "5px" }}>
            {status}
          </span>
        </Box>
      ),
    },
    // {
    //   field: "salary",
    //   headerName: "salary",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Typography color={colors.greenAccent[500]}>
    //       ₱{params.row.cost}
    //     </Typography>
    //   ),
    // },
  ];

  return (
    <Box>
      <Box
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          left: "55%",
          transform: "translateX(-45%)",
          my: "-9px",
          zIndex: "1",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "-15px",
            fontWeight: "550",
          }}
        >
          Period:
        </Typography>
        <DateField
          label="Start Date"
          // value={dayjs(startDate)}
          // onChange={handleStartDate}
          // format="MM/DD/YYYY"
          variant="standard"
          width="100%"
          pr={5}
        />
        <DateField
          label="End Date"
          // value={dayjs(endDate)}
          // onChange={handleEndDate}
          // format="MM/DD/YYYY"
          variant="standard"
          width="100%"
          pr={5}
        />
      </Box>
      <DataGrid data={mockPurchaseRequest} columns={columns} />
    </Box>
  );
}
