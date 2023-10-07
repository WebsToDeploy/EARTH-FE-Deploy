import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import useRefreshToken from "../hooks/useRefreshToken";
import { useStateContext } from "./ContextProvider";

export default function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useStateContext();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    verifyRefreshToken();
    if (!auth?.accessToken) {
      verifyRefreshToken();
      console.log("refresh");
    } else {
      setLoading(false);
    }
  }, []);
  // useEffect(() => {
  //   console.log(`Loading Status: ${loading}`);
  //   console.log(`AT: ${JSON.stringify(auth?.accessToken)}`);
  // }, [loading]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {loading ? <Typography>Loading...</Typography> : <Outlet />}
    </Box>
  );
}
