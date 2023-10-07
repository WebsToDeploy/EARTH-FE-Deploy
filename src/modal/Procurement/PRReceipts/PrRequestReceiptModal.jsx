import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";
import procurementService from "services/procurement-service";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import bontrade from "../../../assets/bontrade1.png";
import eg from "../../../assets/eglogistics.png";
import earth from "../../../assets/images/logo3.png";

function PrRequestReceiptModal({ prReceiptData, open, handleClose }) {
  const [products, setProducts] = useState();

  const downloadPDF = () => {
    const capture = document.querySelector(".receipt");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new JsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("purchase-request-receipt.pdf");
    });
  };
  // disable inpect elements
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const handleGetAll = () => {
    procurementService.getAllAPI("product").then((e) => {
      setProducts(e);
    });
  };

  const handleGetProduct = (evt) => {
    const product = products?.find((item) => item.item_code === evt);
    return product.name;
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <Box
          className="receipt"
          sx={{
            p: "4em",
            width: "801px",
            minHeight: "915px",
            backgroundColor: "white",
            backgroundImage: `url(${earth})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
          }}
        >
          <Grid className="green" container xs={12}>
            <Grid className="blue" display="flex" flexDirection="column" xs={2}>
              <Box
                component="img"
                alt="bontrade"
                src={bontrade}
                height="70px"
                width="90px"
              />
              <Box
                component="img"
                alt="eg"
                src={eg}
                height="70px"
                width="70px"
              />
            </Grid>
            <Grid
              className="purple"
              display="flex"
              flexDirection="column"
              xs={4}
              mr="4em"
            >
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#4248a7",
                }}
              >
                MANILA
              </Typography>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#4248a7",
                  mt: -2,
                }}
              >
                WATERFRONT
              </Typography>
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#4248a7",
                  mt: -2,
                }}
              >
                CITY
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "gray",
                  mt: "-8px",
                  letterSpacing: "2px",
                }}
              >
                Reclamation Project
              </Typography>
            </Grid>
            <Grid className="yellow" xs={5} pt="2em">
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#4248a7",
                  textAlign: "right",
                }}
              >
                Purchase Request Form
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "dark-gray",
                  textAlign: "right",
                }}
              >
                <b>PRF NO.</b> MWC-PRF-2023-0001
              </Typography>
            </Grid>
          </Grid>
          <Grid className="black" container xs={12} pt="1em">
            <Grid container xs={8}>
              <Grid xs={12} display="flex" flexDirection="row">
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    mr: "2em",
                  }}
                >
                  Company
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                  }}
                >
                  {/* eslint-disable-next-line react/destructuring-assignment */}
                  {prReceiptData.company_name}
                </Typography>
              </Grid>
              <Grid xs={12} display="flex" flexDirection="row">
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    mt: "3px",
                    mr: "2em",
                  }}
                >
                  Location
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    mt: "3px",
                  }}
                >
                  {/* eslint-disable-next-line react/destructuring-assignment */}
                  {prReceiptData.address}
                </Typography>
              </Grid>
              <Grid xs={12} display="flex" flexDirection="row">
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    mt: "3px",
                    mr: "21px",
                  }}
                >
                  Attention
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    mt: "3px",
                  }}
                >
                  {/* eslint-disable-next-line react/destructuring-assignment */}
                  {prReceiptData.attention}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "black",
                    mt: "15px",
                  }}
                >
                  Dear Sir,
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "black",
                    mt: "10px",
                  }}
                >
                  Please deliver to us the following items:
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={4} display="flex" flexDirection="row">
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                  mr: "2em",
                }}
              >
                Date
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {formattedDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid className="red" container xs={12} mt="1em">
            <Table>
              <TableHead sx={{ borderBottom: "2px solid black" }}>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "black",
                      }}
                    >
                      Item
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "black",
                      }}
                    >
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "black",
                      }}
                    >
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: "black",
                      }}
                    >
                      Amount
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "none" }}>
                {prReceiptData.items?.map((item) => (
                  <TableRow key={item.item_code}>
                    <TableCell sx={{ border: "none" }}>
                      {handleGetProduct(item.item_code)}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {item.description}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid container xs={12} mt="5em">
            <Grid xs={12}>
              <Divider color="black" sx={{ height: "1px", ml: "85%" }} />
            </Grid>
            <Grid xs={10} mt="1em">
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                  textAlign: "right",
                }}
              >
                sub-total amount
              </Typography>
            </Grid>
            <Grid xs={2} mt="1em">
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                  textAlign: "right",
                }}
              >
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    textAlign: "right",
                  }}
                >
                  ₱{" "}
                </span>
                {prReceiptData.subTotal}
              </Typography>
            </Grid>
            <Grid xs={10} mt="1em">
              <Typography
                sx={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "black",
                  textAlign: "right",
                }}
              >
                <b>ADD</b> VAT (12%)
              </Typography>
            </Grid>
            <Grid xs={10}>
              <Typography
                sx={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "black",
                  textAlign: "right",
                }}
              >
                <b>LESS</b> WITHOLDING TAX (2%)
              </Typography>
            </Grid>
            <Grid xs={10} mt="1em">
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                  textAlign: "right",
                }}
              >
                TOTAL AMOUNT
              </Typography>
            </Grid>
            <Grid xs={2} mt="1em">
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                  textAlign: "right",
                }}
              >
                {/* eslint-disable-next-line react/destructuring-assignment */}
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    textAlign: "right",
                  }}
                >
                  ₱{" "}
                </span>
                {prReceiptData.total}
              </Typography>
            </Grid>
            <Grid xs={12} mt="1em">
              <Divider color="black" sx={{ height: "2px" }} />
            </Grid>
            <Grid xs={12} mt="1em">
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                Remarks
              </Typography>
            </Grid>
            <Grid xs={12} mt="1em">
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "black",
                }}
              >
                {/* eslint-disable-next-line react/destructuring-assignment */}
                {prReceiptData.remarks}
              </Typography>
            </Grid>
            <Grid container xs={4}>
              <Grid xs={12} mt="7em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Requested by
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    mt: "2em",
                  }}
                >
                  Name
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                  }}
                >
                  Position
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    fontStyle: "italic",
                  }}
                >
                  Company
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={4}>
              <Grid xs={12} mt="7em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Checked by
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    mt: "2em",
                  }}
                >
                  Justine M. Eduave
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                  }}
                >
                  Executive Assistant
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    fontStyle: "italic",
                  }}
                >
                  E&G Logistics
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={4}>
              <Grid xs={12} mt="7em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Approved by
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    mt: "2em",
                  }}
                >
                  Oliver M. Eduave
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                  }}
                >
                  Managing Director
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    fontStyle: "italic",
                  }}
                >
                  E&G Logistics
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} mt="1em">
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                THIS IS A SYSTEM GENERATED DOCUMENT. Important: This document is
                applicable for both electronic and physical submissions.
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "gray",
                  fontStyle: "italic",
                }}
              >
                Electronic submission is accepted; however, whether submitted
                electronically or physically, a valid signature remains
                essential for authorization and validity.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container xs={12}>
          <Grid xs={3} />
          <Grid xs={3} my="1em">
            <Button
              textAlign="right"
              variant="contained"
              onClick={downloadPDF}
              sx={{
                backgroundColor: "#3e4396",
                ":hover": {
                  backgroundColor: "#a4a9fc",
                },
              }}
            >
              <DownloadIcon />
              <Typography ml={1} fontWeight="bold">
                Download
              </Typography>
            </Button>
          </Grid>
          <Grid xs={3} my="1em">
            <Button
              textAlign="right"
              variant="contained"
              onClick={handleClose}
              sx={{
                backgroundColor: "#3e4396",
                ":hover": {
                  backgroundColor: "#a4a9fc",
                },
              }}
            >
              <CancelIcon />
              <Typography ml={1} fontWeight="bold">
                Close
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

PrRequestReceiptModal.defaultProps = {
  prReceiptData: {},
  handleClose: () => {},
};

PrRequestReceiptModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  prReceiptData: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};

export default PrRequestReceiptModal;
