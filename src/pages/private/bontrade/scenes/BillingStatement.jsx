import React from "react";
import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import logo from "../../../../assets/images/EARTH-Logo.png";
import uglogo from "../../../../assets/ugtrade.png";
import bonalogo from "../../../../assets/bontrade.png";
import eglogo from "../../../../assets/eglogistics.png";
import erologo from "../../../../assets/erotas.png";

function BillingStatement() {
  return (
    <Box
      sx={{
        // height: "100vh",
        // width: "40vw",
        height: "1150px",
        width: "743px",
        backgroundColor: "#fff",
        border: "solid 1px black",
        px: 6,
        py: 4,
      }}
    >
      {/* <Box
        component="img"
        alt="logo"
        src={logo}
        height="80px"
        width="80px"
        sx={{ position: "absolute" }}
      /> */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          component="img"
          alt="bonalogo"
          src={bonalogo}
          height="80px"
          width="100px"
        />
        <Box
          component="img"
          alt="uglogo"
          src={uglogo}
          height="80px"
          width="80px"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#4248a7",
              m: 0,
            }}
          >
            Manila Waterfront City
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "gray",
              mt: "-8px",
            }}
          >
            Reclamation Project
          </Typography>
        </Box>
        <Box
          component="img"
          alt="eglogo"
          src={eglogo}
          height="80px"
          width="80px"
        />
        <Box
          component="img"
          alt="erologo"
          src={erologo}
          height="80px"
          width="80px"
        />
      </Box>
      <Divider sx={{ color: "black", height: 2 }} />
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            color: "#4248a7",
          }}
        >
          Billing Statement
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  bill/sold to
                </Typography>
              </Grid>
              <Grid item xs={4}>
                Company A
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  address
                </Typography>
              </Grid>
              <Grid item xs={4}>
                Address A
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Contact no.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                09123456789
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Vessel
                </Typography>
              </Grid>
              <Grid item xs={4}>
                LCT ABC
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Cargo
                </Typography>
              </Grid>
              <Grid item xs={4}>
                Sand
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={0}>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  billing no.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                MWC-BS-2023-000
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  billing date
                </Typography>
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  POD
                </Typography>
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  POL
                </Typography>
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                >
                  Delivery date
                </Typography>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Item Description</b>
            </TableCell>
            <TableCell>
              <b>Quantity</b>
            </TableCell>
            <TableCell>
              <b>Unit</b>
            </TableCell>
            <TableCell>
              <b>Unit Cost</b>
            </TableCell>
            <TableCell>
              <b>Amount Due</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Marine Sand</TableCell>
            <TableCell>100.00</TableCell>
            <TableCell>Cu. M</TableCell>
            <TableCell>P 1.00</TableCell>
            <TableCell>P 100.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box sx={{ mt: "300px" }}>
        <Divider />
        <Grid container spacing={0} sx={{ textAlign: "right" }}>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <Typography sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Sub-Total Amount
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              P 100.00
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              ADD VAT (12%)
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              P 12.00
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: "10px",
              }}
            >
              LESS WITHHOLDING TAX (2%)
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              -P2.00
            </Typography>
          </Grid>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <Typography sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              TOTAL BALANCE DUE
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
              P 110.00
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>
      <Box mb={2}>
        <Typography sx={{ fontWeight: "bold" }}>
          Payments shall be Payable to:
        </Typography>
        <Typography>Account Name: E&G LOGISTICS / OLIVER M. EDUAVE</Typography>
        <Typography>Account Number: 291001061195</Typography>
        <Typography>Bank and Branch: UCPB SAVINGS, Makati City</Typography>
      </Box>

      <Box mb={10}>
        <Typography sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Remarks
        </Typography>
      </Box>

      <Grid container spacing={0} sx={{ textAlign: "left", mb: 2 }}>
        <Grid xs={3} sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Prepared By
        </Grid>
        <Grid xs={2} sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Checked By
        </Grid>
        <Grid xs={3} />
        <Grid xs={4} sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
          Received and Conformed By
        </Grid>
        <Grid xs={3}>
          <Typography>Justine Eduave</Typography>
          <Typography>Executive Assistant</Typography>
          <Typography>E & G Logistics</Typography>
        </Grid>
        <Grid xs={2}>
          <Typography>Oliver M. Eduave</Typography>
          <Typography>Managing Director</Typography>
          <Typography>E & G Logistics</Typography>
        </Grid>
        <Grid xs={3}>
          <Typography>Roy C. Vistal</Typography>
          <Typography>Chief Executive Officer</Typography>
          <Typography>Erotas Portus Inc.</Typography>
        </Grid>
        <Grid xs={4}>
          <Typography>Name</Typography>
          <Typography>Position</Typography>
          <Typography>Company</Typography>
        </Grid>
      </Grid>

      <Box>
        <Typography sx={{ fontSize: "8px" }}>
          THIS IS A SYSTEM GENERATED DOCUMENT: Important: This document is
          applicable for both electronic and physical submissions.
        </Typography>
        <Typography sx={{ fontSize: "8px" }}>
          Electronic submission is accepted. However, whether submitted
          electronically or physically, a valid signature remains essential for
          authorization and validity.
        </Typography>
      </Box>
    </Box>
  );
}

export default BillingStatement;
