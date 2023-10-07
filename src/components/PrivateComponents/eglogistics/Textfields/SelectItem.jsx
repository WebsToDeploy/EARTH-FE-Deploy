import React, { useEffect, useState } from "react";
import procurementService from "services/procurement-service";
import PropTypes from "prop-types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

export default function SelectItem({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  width,
  pr,
}) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const moduleName = "product";

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setItems(e);
        setFilteredItems(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleFilterChange = (event, evt) => {
    if (evt === null) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(evt.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  return (
    <Autocomplete
      id="item-autocomplete"
      options={filteredItems}
      getOptionLabel={(item) => item.name}
      onInputChange={handleFilterChange}
      value={items.find((item) => item.name === value) || null}
      onChange={(event, newValue) => {
        onChange?.(name, newValue?.item_code || ""); // Pass the name and selected value to the parent component
      }}
      loading={loading}
      sx={{ pr }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          variant="outlined"
          size="small"
          value={value || ""}
          onChange={(newValue) => {
            onChange?.(newValue);
          }}
          error={error}
          helperText={helperText}
          sx={{ width: { width } }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

SelectItem.defaultProps = {
  label: "",
  name: "",
  value: "",
  onChange: () => {},
  error: false,
  helperText: "",
  width: "100%",
  pr: 5,
};
// Typechecking props of the MDAlert
SelectItem.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  width: PropTypes.string,
  pr: PropTypes.number,
};
