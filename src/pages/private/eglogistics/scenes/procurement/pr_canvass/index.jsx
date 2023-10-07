import React, { useEffect, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import procurementService from "services/procurement-service";
import themes from "themes/theme";
import Header from "components/PrivateComponents/eglogistics/Header";
import Filters from "./filters";
import CanvasTable from "./canvasTable";

const { tokens } = themes;
const moduleName = "canvass";

export default function CanvassSheet() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [reset, setReset] = useState(false);
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [supplier, setSupplier] = useState();
  const [priceRange, setPriceRange] = useState();

  const handleAddToCart = () => {
    try {
      setError("");
      setLoading(true);
      procurementService
        .addAPI(data, moduleName)
        .then(() => {
          setReset(true);
        })
        .catch((err) => {
          setError(err?.message);
        })
        .finally(() => {
          setLoading(false);
          setReset(false);
        });
    } catch (err) {
      console.warn(error);
    }
  };

  const handlGetCartPrice = () => {
    procurementService.getPriceAPI(moduleName).then((e) => {
      setCartTotal(e);
    });
  };

  useEffect(() => {
    handlGetCartPrice();
  }, [loading]);

  return (
    <Box sx={{ m: "-5px 20px 20px 20px" }}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: "20px" }}
      >
        <Header
          title="Canvass Sheet"
          subtitle="Compare suppliers and decide better with our Purchase Canvass Sheet"
        />
      </Box>
      <Grid
        container
        spacing={0}
        borderRadius="10px"
        boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
        sx={{ backgroundColor: colors.primary[400] }}
      >
        <Grid item xs={2} sx={{ minWidth: "150px" }}>
          <Filters
            addToCart={handleAddToCart}
            selectedData={data || 0}
            cartTotal={cartTotal}
            isUpdated={reset}
            categoryId={setCategory}
            brandId={setBrand}
            supplierId={setSupplier}
            range={setPriceRange}
          />
        </Grid>

        <Grid
          item
          xs={10}
          sx={{ borderLeft: "solid 1px #C0C0C0", paddingTop: "20px" }}
        >
          <CanvasTable
            selectedData={setData}
            reset={reset}
            category={category}
            brand={brand}
            supplier={supplier}
            priceRage={priceRange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
