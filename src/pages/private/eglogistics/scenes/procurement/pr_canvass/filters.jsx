import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SelectBrand from "components/PrivateComponents/eglogistics/Textfields/SelectBrand";
import SelectCategory from "components/PrivateComponents/eglogistics/Textfields/SelectCategory";
import SelectSupplier from "components/PrivateComponents/eglogistics/Textfields/SelectSupplier";
// import procurementService from "services/procurement-service";
import themes from "themes/theme";
import { useNavigate } from "react-router-dom";

const { tokens } = themes;
const priceData = [0, 999999]; // MOCK DATA
// const moduleName = "canvass";

function Filters({
  addToCart,
  selectedData,
  cartTotal,
  categoryId,
  brandId,
  supplierId,
  range,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [supplier, setSupplier] = useState();
  const [priceRange, setPriceRange] = useState(priceData);
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  const handleOpenCart = () => {
    navigate("/cart");
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    if (category) {
      categoryId(category);
    }
    if (brand) {
      brandId(brand);
    }
    if (supplier) {
      supplierId(supplier);
    }
    if (priceRange) {
      range(priceRange);
    }
  }, [category, brand, supplier, priceRange]);

  useEffect(() => {
    if (selectedData.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [selectedData]);

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        gap: "0.9em",
        padding: "20px 40px 30px",
        textAlign: "center",
      }}
    >
      {/* <CanvassCart
        open={openCartModal}
        handleClose={handleCloseCart}
        onSuccess={() => {
          setOpenCartModal(false);
          // handleGetAll();
        }}
        cartTotal={cartTotal}
        updateTable={isUpdated}
      /> */}
      <Typography
        fontSize="medium"
        fontWeight="900"
        sx={{
          letterSpacing: "0.3em",
          fontSize: "small",
        }}
      >
        VIEW CART
      </Typography>
      <Divider
        variant="middle"
        sx={{ borderTopWidth: "1px", borderTopColor: "black" }}
      />
      <IconButton
        aria-label="cart"
        onClick={handleOpenCart}
        sx={{
          "&:hover": {
            color: colors.blueAccent[700],
          },
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{
            color: colors.blueAccent[300],
            fontSize: 55,
            alignSelf: "center",
          }}
        />
        {cartTotal.items > 0 ? (
          <Box
            mt="-2.5rem"
            ml="-1.7rem"
            sx={{
              borderRadius: "50%",
              backgroundColor: colors.redAccent[500],
              px: "0.8rem",
              py: "0.01rem",
            }}
          >
            <Typography
              fontWeight="900"
              fontSize="15px"
              color={colors.primary[400]}
            >
              {cartTotal.items}
            </Typography>
          </Box>
        ) : null}
      </IconButton>

      <Divider variant="middle" />
      <Typography
        fontSize="small"
        fontWeight="600"
        color={cartTotal.items > 0 ? colors.greenAccent[300] : colors.grey[100]}
      >
        Total: <span style={{ fontSize: "15px" }}>₱</span>{" "}
        {cartTotal.total_price > 0 ? cartTotal.total_price : 0}
      </Typography>
      <Divider variant="middle" />
      <Typography
        fontSize="medium"
        fontWeight="900"
        sx={{
          letterSpacing: "0.3em",
          fontSize: "small",
          mt: "15px",
        }}
      >
        FILTERS
      </Typography>
      <Divider
        variant="middle"
        sx={{ borderTopWidth: "1px", borderTopColor: "black" }}
      />
      <SelectCategory
        label="Category"
        name="category_id"
        width="100%" // disabled={loading}
        value={category}
        onChange={(fieldName, selectedValue) => {
          setCategory(selectedValue);
        }}
      />
      <Divider variant="middle" />
      <SelectBrand
        label="Brand"
        name="brand_id"
        width="100%"
        // disabled={loading}
        value={brand}
        onChange={(fieldName, selectedValue) => {
          setBrand(selectedValue);
        }}
      />
      <Divider variant="middle" />
      <SelectSupplier
        label="Supplier"
        name="supplier_id"
        width="100%" // disabled={loading}
        value={supplier}
        onChange={(fieldName, selectedValue) => {
          setSupplier(selectedValue);
        }}
      />
      <Divider variant="middle" />
      <Typography fontSize="small" fontWeight="600">
        Price
      </Typography>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        min={0}
        max={priceData[1]}
        size="medium"
        disableSwap
        valueLabelDisplay="on"
        // eslint-disable-next-line react/no-unstable-nested-components
        valueLabelFormat={(price) => (
          <span>
            <span style={{ fontSize: "15px" }}>₱</span> {price}
          </span>
        )}
        sx={{
          color: colors.blueAccent[300],
          my: "15px",
          "& .MuiSlider-valueLabel": {
            color: colors.grey[900],
            backgroundColor: colors.blueAccent[400],
            borderRadius: "10px",
            fontSize: "small",
          },
        }}
      />

      <Typography
        fontSize="medium"
        fontWeight="900"
        sx={{
          letterSpacing: "0.3em",
          fontSize: "small",
        }}
      >
        SELECTED
      </Typography>
      <Divider
        variant="middle"
        sx={{ borderTopWidth: "1px", borderTopColor: "black" }}
      />
      <Typography
        fontSize="small"
        fontWeight="600"
        color={
          selectedData.length > 0 ? colors.greenAccent[300] : colors.grey[100]
        }
      >
        Selected ({selectedData ? selectedData.length : 0}{" "}
        {selectedData.length > 1 ? "items" : "item"}):{" "}
        <span style={{ fontSize: "15px" }}>₱</span>{" "}
        {selectedData
          ? selectedData.reduce(
              (total, currentItem) => total + (currentItem.price || 0),
              0
            )
          : 0}
      </Typography>

      <Button
        onClick={addToCart}
        disabled={disable}
        sx={{
          backgroundColor: disable ? "gray" : colors.blueAccent[300],
          color: "#fff",
          "&:hover": {
            color: "white",
            backgroundColor: disable
              ? colors.blueAccent[700]
              : colors.blueAccent[800],
          },
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          borderRadius: "5px",
          my: "10px",
        }}
      >
        <ShoppingCartIcon sx={{ mr: "10px" }} />
        Add To Cart
      </Button>
    </Box>
  );
}

export default Filters;

Filters.defaultProps = {
  addToCart: () => {},
  selectedData: [],
  cartTotal: {},
  categoryId: null,
  brandId: null,
  supplierId: null,
  range: [],
};

Filters.propTypes = {
  addToCart: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selectedData: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  cartTotal: PropTypes.object,
  categoryId: PropTypes.number,
  brandId: PropTypes.number,
  supplierId: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  range: PropTypes.array,
};
