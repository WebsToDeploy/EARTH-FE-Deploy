import React, { useEffect, useState } from "react";
import procurementService from "services/procurement-service";
import PropTypes from "prop-types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

export default function SelectCategory({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  width,
}) {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const moduleName = "category";

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setCategories(e);
        setFilteredCategories(e);
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
      setFilteredCategories(categories);
      return;
    }

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(evt.toLowerCase())
    );

    setFilteredCategories(filtered);
  };

  return (
    <Autocomplete
      id="category-autocomplete"
      options={filteredCategories}
      getOptionLabel={(category) => category.name}
      onInputChange={handleFilterChange}
      value={categories.find((category) => category.uuid === value) || null}
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

SelectCategory.defaultProps = {
  label: "",
  name: "",
  value: null,
  onChange: () => {},
  error: false,
  helperText: "",
  width: "100%",
};
// Typechecking props of the MDAlert
SelectCategory.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  width: PropTypes.string,
};
