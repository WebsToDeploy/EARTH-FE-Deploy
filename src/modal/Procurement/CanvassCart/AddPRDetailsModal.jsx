import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, Modal, TextField, useTheme } from "@mui/material";
import Header from "components/PrivateComponents/eglogistics/Header";
import themes from "../../../themes/theme";

const style = {
  backgroundColor: (themeMode) =>
    themeMode.palette.mode === "dark" ? "#1f2a40" : "#fff",
  position: "absolute",
  top: "50%",
  left: "57%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  width: "auto",
  boxShadow: 24,
  p: 4,
};

const { tokens } = themes;

export default function AddPRDetails({
  open,
  handleClose,
  PROtherDetails,
  handleSubmit,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [attention, setAttention] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    PROtherDetails({ attention, remarks });
  }, [attention, remarks]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        // setError("");
      }}
    >
      <Box sx={style}>
        <Box mb={4}>
          <Header title="Add PR Details" mb={4} />
          {/* {error && "An error occurred. Make sure to fill up required fields"} */}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="attention"
              type="text"
              size="small"
              label="Attention"
              value={attention}
              onChange={(evt) => {
                setAttention(evt.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="remarks"
              type="text"
              size="small"
              label="Remarks"
              value={remarks}
              onChange={(evt) => {
                setRemarks(evt.target.value);
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        {open && (
          <Box sx={{ textAlign: "right", height: 100 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                mr: 2,
                mt: 5,
                width: 80,
                backgroundColor: colors.blueAccent[300],
              }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              sx={{
                mr: 2,
                mt: 5,
                width: 80,
                backgroundColor: "#3e4287",
              }}
              onClick={() => {
                setAttention("");
                setRemarks("");
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

AddPRDetails.defaultProps = {
  handleClose: () => {},
  // onSuccess: () => {},
  PROtherDetails: [],
  handleSubmit: () => {},
};

AddPRDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  // onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  PROtherDetails: PropTypes.object,
  handleSubmit: PropTypes.func,
};
