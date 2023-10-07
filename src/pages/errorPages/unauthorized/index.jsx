import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Box>
      <Box>
        <Typography>You are unauthorized</Typography>
      </Box>
      <Box>
        <Button onClick={goBack}>Go Back</Button>
      </Box>
    </Box>
  );
}

export default Unauthorized;
