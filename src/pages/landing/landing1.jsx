import React from "react";
import { Box, Slide, Typography, Zoom } from "@mui/material";
import { useStateContext } from "contexts/ContextProvider";
import earth from "../../assets/images/logo.png";
import Landing2 from "./landing2";
import "./container.css";

export default function Landing1() {
  const { isMainLanding, setIsMainLanding } = useStateContext();

  const handleClick = () => {
    setIsMainLanding(true);
  };

  return (
    <Box className="landing-bg">
      <Slide in={isMainLanding} direction="left">
        <Box>
          <Landing2 />
        </Box>
      </Slide>
      <Zoom in={!isMainLanding}>
        <Box
          sx={{
            position: "absolute",
            textAlign: "center",
            width: "100vw",
            overflow: "auto",
          }}
        >
          <Box // Earth Logo
            onClick={handleClick}
            sx={{
              backgroundImage: `url(${earth})`,
              backgroundSize: "contain",
              height: "700px",
              width: "700px",
              m: "auto",
              cursor: "pointer",
            }}
          />
        </Box>
      </Zoom>
      <Box
        sx={{
          position: "absolute",
          bottom: 60,
          width: "100vw",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            textShadow: "0 0 10px white",
          }}
        >
          Copyright © 2023. E.A.R.T.H. Command Center - A subsidiary business
          unit of E & G Logistics. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}
