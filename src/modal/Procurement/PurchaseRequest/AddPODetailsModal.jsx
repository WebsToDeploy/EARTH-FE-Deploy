import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, Modal, TextField, useTheme } from "@mui/material";
import Header from "components/PrivateComponents/eglogistics/Header";
import TextFieldDatePicker from "components/PrivateComponents/eglogistics/Textfields/Datepicker";
import dayjs from "dayjs";
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

export default function AddPODetails({
  open,
  handleClose,
  POOtherDetails,
  handleSubmit,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [TOA, setTOA] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    POOtherDetails({ TOA, dueDate });
  }, [TOA, dueDate]);

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
              name="TOA"
              type="text"
              size="small"
              label="Terms of Agreement"
              value={TOA}
              onChange={(evt) => {
                setTOA(evt.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldDatePicker
              label="Due Date"
              value={dueDate}
              onChange={(evt) => setDueDate(dayjs(evt).format("YYYY-MM-DD"))}
              maxDate={new Date()}
            />
          </Grid>
        </Grid>
        {open && (
          <Box sx={{ textAlign: "right", height: 100 }}>
            <Button
              variant="contained"
              disabled={(TOA === "", dueDate === "")}
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
                setTOA("");
                setDueDate("");
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

AddPODetails.defaultProps = {
  handleClose: () => {},
  // onSuccess: () => {},
  POOtherDetails: [],
  handleSubmit: () => {},
};

AddPODetails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  // onSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  POOtherDetails: PropTypes.object,
  handleSubmit: PropTypes.func,
};
