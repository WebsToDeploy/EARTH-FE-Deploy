import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

function SelectRole({ label, name, ...rest }) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} label={label} fullWidth {...rest}>
        <MenuItem value="superadmin">Super Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="canvasser">Canvasser</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectRole;

SelectRole.defaultProps = {
  label: "",
  name: "",
};

SelectRole.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
