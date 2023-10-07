import React, { useEffect, useState } from "react";
import procurementService from "services/procurement-service";
import PropTypes from "prop-types";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

export default function SelectBrand({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  width,
}) {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const moduleName = "brand";

  const handleGetAll = () => {
    setLoading(true);
    procurementService
      .getAllAPI(moduleName)
      .then((e) => {
        setBrands(e);
        setFilteredBrands(e);
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
      setFilteredBrands(brands);
      return;
    }

    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(evt.toLowerCase())
    );

    setFilteredBrands(filtered);
  };
  return (
    <Autocomplete
      id="brand-autocomplete"
      options={filteredBrands}
      getOptionLabel={(brand) => brand.name}
      onInputChange={handleFilterChange}
      value={brands.find((brand) => brand.uuid === value) || null}
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
  //     <TextField
  //       label="Type to filter brands"
  //       onChange={(e) => handleFilterBrands(e.target.value)}
  //     />
  //     <FormControl
  //       error={error}
  //       disabled={loading}
  //       size="small"
  //       sx={{
  //         backgroundColor: (themeMode) =>
  //           themeMode.palette.mode === "dark" ? "#2e3442" : "#fff",
  //         width: "60%",
  //       }}
  //     >
  //       <InputLabel id="demo-simple-select-label">{label}</InputLabel>
  //       <Select
  //         labelId="demo-simple-select-label"
  //         id="demo-simple-select"
  //         label={label}
  //         name={name}
  //         value={value}
  //         onChange={(newValue) => {
  //           onChange?.(newValue);
  //         }}
  //       >
  //         {filteredBrands.map((brand) => (
  //           <MenuItem key={brand.uuid} value={brand.uuid}>
  //             {brand.name}
  //           </MenuItem>
  //         ))}
  //       </Select>
  //       <FormHelperText>{helperText}</FormHelperText>
  //     </FormControl>
  //   </Box>
  // );
}

SelectBrand.defaultProps = {
  label: "",
  name: "",
  value: null,
  onChange: () => {},
  error: false,
  helperText: "",
  width: "100%",
};
// Typechecking props of the MDAlert
SelectBrand.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  width: PropTypes.string,
};
