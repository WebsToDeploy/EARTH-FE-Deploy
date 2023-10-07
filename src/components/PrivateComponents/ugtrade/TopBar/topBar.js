import * as React from "react";
import { useNavigate } from "react-router-dom";
// import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Logo from "assets/ugtrade.png";

function StickyAppBar() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 100 }}>
      <AppBar
        position="static"
        sx={{
          borderBottom: "3px solid #830076", // Your desired color for the bottom border
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              // height: "60vh",
              mt: "10px",
              margin: "auto",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ml: "27%",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleGoBack}
              sx={{ mr: 2, ml: 5 }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  height: "100px",
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: "bold", color: "#231a8b" }}
              >
                MANILA WATERFRONT CITY <break />
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#606060",
                  my: "-5px",
                  letterSpacing: "4px",
                }}
              >
                RECLAMATION PROJECT
              </Typography>
              <Box
                sx={{
                  backgroundColor: "black",
                  height: "6px",
                  width: "500px",
                  my: "9px",
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default StickyAppBar;
