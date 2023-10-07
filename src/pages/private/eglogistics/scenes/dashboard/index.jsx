/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import themes from "themes/theme";
import mockTransaction from "data/mockData";
import Header from "components/PrivateComponents/eglogistics/Header";
import LineChart from "components/PrivateComponents/eglogistics/LineChart";
import BarChart from "components/PrivateComponents/eglogistics/BarChart";
import StatBox from "components/PrivateComponents/eglogistics/StatBox";
import PieChart from "components/PrivateComponents/eglogistics/PieChart";

const { tokens } = themes;
const { mockTransactions } = mockTransaction;

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ m: "-5px 20px 20px 20px" }}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: "20px" }}
      >
        <Header title="Dashboard" subtitle="Welcome E&G Logistics dashboard" />

        <Box>
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
              borderRadius: "10px",
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <StatBox
            title="12"
            subtitle="Purchase Request"
            progress="0.33"
            increase="+33.4%"
            icon={
              <ShoppingBagIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <StatBox
            title="24"
            subtitle="Purchase Order"
            progress="0.66"
            increase="+66.7%"
            icon={
              <ShoppingBasketIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <StatBox
            title="63"
            subtitle="Received Purchase and Transfer"
            progress="0.43"
            increase="+43%"
            icon={
              <ShoppingCartCheckoutIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <StatBox
            title="$4,270"
            subtitle="Revenue"
            progress="0.05"
            increase="+5%"
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="25px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Inventory
          </Typography>
          <Box height="260px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          borderRadius="25px"
          overflow="hidden"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Purchase History
            </Typography>
          </Box>
          <Box
            maxHeight="calc(100% - 64px)"
            overflow="auto"
            borderRadius="0 0 15px 15px"
          >
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      color={colors.blueAccent[300]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography color={colors.grey[100]}>
                      {transaction.date}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.cost}
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          borderRadius="25px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <Typography variant="h5" fontWeight="600">
            Recent Costs Data (2023)
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop="-10px"
          >
            <Box height="290px" width="100%">
              <PieChart />
            </Box>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          borderRadius="25px"
          boxShadow="0px 5px 10px rgba(0, 0, 0, 0.4)"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Recent Data (2023)
              </Typography>
              {/* <Typography
                variant="h7"
                fontWeight="500"
                color={colors.greenAccent[300]}
              >
                36 total applications for the last 6 months
              </Typography> */}
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="260px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
