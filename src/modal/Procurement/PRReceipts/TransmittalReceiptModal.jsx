import React from "react";
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
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import bontrade from "../../../assets/bontrade.png";
import eg from "../../../assets/eglogistics.png";
import earth from "../../../assets/images/logo3.png";

function TransmittalReceiptModal({
  tfNum,
  to,
  toAddress,
  toContact,
  from,
  fromAddress,
  fromContact,
  billingDate,
  purpose,
  items,
  open,
  handleClose,
}) {
  const downloadPDF = () => {
    const capture = document.querySelector(".receipt");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new JsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("transmittal-receipt.pdf");
    });
  };
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
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
            <Grid className="blue" display="flex" flexDirection="column" xs={1}>
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
              ml="3em"
              mr="1em"
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
            <Grid className="yellow" xs={6} pt="2em">
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "#4248a7",
                  textAlign: "right",
                }}
              >
                Transmittal Form
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "dark-gray",
                  textAlign: "right",
                }}
              >
                <b>TF NO.</b> {tfNum}
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
                    mr: "7em",
                  }}
                >
                  To
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                  }}
                >
                  {to}
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
                    mr: "51px",
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    mt: "3px",
                  }}
                >
                  {toAddress}
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
                  Contact No.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    mt: "3px",
                  }}
                >
                  {toContact}
                </Typography>
              </Grid>
              <Grid xs={12} display="flex" flexDirection="row" mt="1em">
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    mr: "80px",
                  }}
                >
                  From
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                  }}
                >
                  {from}
                </Typography>
              </Grid>
              <Grid xs={12} display="flex" flexDirection="row">
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    mr: "51px",
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                  }}
                >
                  {fromAddress}
                </Typography>
              </Grid>
              <Grid xs={12} display="flex" flexDirection="row">
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                    mr: "21px",
                  }}
                >
                  Contact No.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "black",
                  }}
                >
                  {fromContact}
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
                Billing Date
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "uppercase",
                  color: "black",
                }}
              >
                {billingDate}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} my="1em">
            <Typography
              sx={{
                fontSize: "15px",
                textTransform: "uppercase",
                color: "black",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Purpose
            </Typography>
          </Grid>
          <Grid xs={12} mb="1em">
            <Divider color="black" sx={{ height: "1px" }} />
          </Grid>
          <Grid xs={12}>
            <Typography
              sx={{
                fontSize: "15px",
                color: "black",
                textAlign: "center",
              }}
            >
              {purpose}
            </Typography>
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
                      Item Type
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
                      Unit
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ borderBottom: "2px solid black" }}>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    {Object.keys(item).map((key) => (
                      <TableCell sx={{ border: "none" }}>{item[key]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid container xs={12}>
            <Grid container xs={4}>
              <Grid xs={12} mt="1em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Prepared by
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
              <Grid xs={12} mt="1em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Noted by
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
              <Grid xs={12} mt="1em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Date
                </Typography>
              </Grid>
            </Grid>
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
          <Grid container xs={12} mt="2em">
            <Grid container xs={6}>
              <Grid xs={12} mt="1em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Received by
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
            <Grid container xs={6}>
              <Grid xs={12} mt="1em">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                >
                  Date received
                </Typography>
              </Grid>
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
              electronically or physically, a valid signature remains essential
              for authorization and validity.
            </Typography>
          </Grid>
        </Box>
        <Grid container xs={12}>
          <Grid xs={4} />
          <Grid xs={2} my="1em">
            <Button textAlign="right" variant="contained" onClick={downloadPDF}>
              Download
            </Button>
          </Grid>
          <Grid xs={2} my="1em">
            <Button textAlign="right" variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

TransmittalReceiptModal.defaultProps = {
  handleClose: () => {},
  tfNum: "",
  to: "",
  toAddress: "",
  toContact: "",
  from: "",
  fromAddress: "",
  fromContact: "",
  billingDate: "",
  purpose: "",
  items: [],
};

TransmittalReceiptModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  tfNum: PropTypes.string,
  to: PropTypes.string,
  toAddress: PropTypes.string,
  toContact: PropTypes.string,
  from: PropTypes.string,
  fromAddress: PropTypes.string,
  fromContact: PropTypes.string,
  billingDate: PropTypes.string,
  purpose: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object),
};

export default TransmittalReceiptModal;
