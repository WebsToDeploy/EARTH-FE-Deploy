import React, { useState } from "react";
import { Box, Tabs, Tab, useTheme } from "@mui/material";
import themes from "themes/theme";
import Header from "components/PrivateComponents/eglogistics/Header";
import ProductLibraries from "./product";
import BrandLibraries from "./brand";
import CategoryLibraries from "./category";
import SupplierLibraries from "./supplier";

const { tokens } = themes;

export default function ProcurementLibararies() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
          title="Purchase Libraries"
          subtitle="Library Management for Purchase Items"
        />
      </Box>
      <Box
        borderRadius="10px"
        boxShadow="0px 5px 10px rgba(0, 0, 0, 0.2)"
        position="relative"
        sx={{ backgroundColor: colors.primary[400] }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="secondary"
            aria-label="procurement libraries tabs"
          >
            <Tab
              label="Product"
              style={{
                margin: "0 20px 0 20px",
                letterSpacing: "0.3em",
                fontFamily: "Poppins, sans-serif",
                fontSize: "small",
                fontWeight: "900",
                color: colors.grey[100],
              }}
            />
            <Tab
              label="Brand"
              style={{
                margin: "0 20px 0 20px",
                letterSpacing: "0.3em",
                fontFamily: "Poppins, sans-serif",
                fontSize: "small",
                fontWeight: "900",
                color: colors.grey[100],
              }}
            />
            <Tab
              label="Category"
              style={{
                margin: "0 20px 0 20px",
                letterSpacing: "0.3em",
                fontFamily: "Poppins, sans-serif",
                fontSize: "small",
                fontWeight: "900",
                color: colors.grey[100],
              }}
            />
            <Tab
              label="Supplier"
              style={{
                margin: "0 20px 0 20px",
                letterSpacing: "0.3em",
                fontFamily: "Poppins, sans-serif",
                fontSize: "small",
                fontWeight: "900",
                color: colors.grey[100],
              }}
            />
          </Tabs>
        </Box>

        <Box role="tabpanel">
          {selectedTab === 0 && <ProductLibraries />}
          {selectedTab === 1 && <BrandLibraries />}
          {selectedTab === 2 && <CategoryLibraries />}
          {selectedTab === 3 && <SupplierLibraries />}
        </Box>
      </Box>
    </Box>
  );
}
