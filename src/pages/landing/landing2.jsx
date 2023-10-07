import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useStateContext } from "contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import earth from "../../assets/images/logo.png";
import waterfront from "../../assets/waterfront.png";

export default function Landing1() {
  const { setIsMainLanding } = useStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    setIsMainLanding(false);
  };

  const handleFirstProj = () => {
    navigate("/waterfront");
  };

  return (
    <Box sx={{ width: "100vw" }}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <Box // Earth Logo
            onClick={handleClick}
            sx={{
              backgroundImage: `url(${earth})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "700px",
              width: "700px",
              ml: "150px",
              cursor: "pointer",
            }}
          />
          <Box // Side Nav
            sx={{
              display: "flex",
              alignItems: "center",
              p: 4,
              height: "90vh",
              width: "600px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 50%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ml: "150px",
                height: "95%",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "poppins",
                  color: "#e3e3e3",
                  fontSize: "25px",
                  ml: 2,
                }}
              >
                PROJECTS
              </Typography>
              <Grid container spacing={0} sx={{ height: "90%" }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "120px",
                      width: "auto",
                    }}
                  >
                    <Button
                      onClick={handleFirstProj}
                      sx={{
                        backgroundImage: `url(${waterfront})`,
                        backgroundSize: "150px",
                        backgroundPosition: "center",
                        height: "100px",
                        minWidth: "100px",
                        backgroundRepeat: "no-repeat",
                        border: "2px solid #e3e3e3",
                        borderRadius: "50%",
                        backgroundColor: "#cacaca",
                        "&:hover": {
                          backgroundSize: "160px",
                          backgroundColor: "#fff",
                          transition: "all 0.1s ease-in-out",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.7)",
                          my: "5px",
                          width: "110px",
                          height: "110px",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#e3e3e3",
                      }}
                    >
                      Manila Waterfront City
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "lightgray",
                      }}
                    >
                      Reclamation Project
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "120px",
                      width: "auto",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundImage: `url(${earth})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        height: "100px",
                        minWidth: "100px",
                        backgroundRepeat: "no-repeat",
                        border: "2px solid #e3e3e3",
                        borderRadius: "50%",
                        backgroundColor: "#cacaca",
                        "&:hover": {
                          backgroundColor: "#fff",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.7)",
                          transition: "all 0.1s ease-in-out",
                          my: "5px",
                          width: "110px",
                          height: "110px",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#fff",
                      }}
                    >
                      Project B
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "lightgray",
                      }}
                    >
                      Project Type
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "120px",
                      width: "auto",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundImage: `url(${earth})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        height: "100px",
                        minWidth: "100px",
                        backgroundRepeat: "no-repeat",
                        border: "2px solid #e3e3e3",
                        borderRadius: "50%",
                        backgroundColor: "#cacaca",
                        "&:hover": {
                          backgroundColor: "#fff",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.7)",
                          transition: "all 0.1s ease-in-out",
                          my: "5px",
                          width: "110px",
                          height: "110px",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#fff",
                      }}
                    >
                      Project C
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "lightgray",
                      }}
                    >
                      Project Type
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "120px",
                      width: "auto",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundImage: `url(${earth})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        height: "100px",
                        minWidth: "100px",
                        backgroundRepeat: "no-repeat",
                        border: "2px solid #e3e3e3",
                        borderRadius: "50%",
                        backgroundColor: "#cacaca",
                        "&:hover": {
                          backgroundColor: "#fff",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.7)",
                          transition: "all 0.1s ease-in-out",
                          my: "5px",
                          width: "110px",
                          height: "110px",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#fff",
                      }}
                    >
                      Project D
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "lightgray",
                      }}
                    >
                      Project Type
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "120px",
                      width: "auto",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundImage: `url(${earth})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        height: "100px",
                        minWidth: "100px",
                        backgroundRepeat: "no-repeat",
                        border: "2px solid #e3e3e3",
                        borderRadius: "50%",
                        backgroundColor: "#cacaca",
                        "&:hover": {
                          backgroundColor: "#fff",
                          boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.7)",
                          transition: "all 0.1s ease-in-out",
                          my: "5px",
                          width: "110px",
                          height: "110px",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      ml: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#fff",
                      }}
                    >
                      Project E
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "lightgray",
                      }}
                    >
                      Project Type
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
