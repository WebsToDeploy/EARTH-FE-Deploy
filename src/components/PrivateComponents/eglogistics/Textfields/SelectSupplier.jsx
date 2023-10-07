import React, { useEffect, useState } from "react";
import procurementService from "services/procurement-service";
import PropTypes from "prop-types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

export default function SelectSupplier({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  width,
}) {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const moduleName = "supplier";

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setSuppliers(e);
        setFilteredSuppliers(e);
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
      setFilteredSuppliers(suppliers);
      return;
    }

    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(evt.toLowerCase())
    );

    setFilteredSuppliers(filtered);
  };

  return (
    <Autocomplete
      id="supplier-autocomplete"
      options={filteredSuppliers}
      getOptionLabel={(supplier) => supplier.name}
      onInputChange={handleFilterChange}
      value={suppliers.find((supplier) => supplier.uuid === value) || null}
      onChange={(event, newValue) => {
        onChange?.(name, newValue?.uuid || ""); // Pass the name and selected value to the parent component
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          variant="outlined"
          size="small"
          value={value}
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

SelectSupplier.defaultProps = {
  label: "",
  name: "",
  value: null,
  onChange: () => {},
  error: false,
  helperText: "",
  width: "100%",
};
// Typechecking props of the MDAlert
SelectSupplier.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  width: PropTypes.string,
};
