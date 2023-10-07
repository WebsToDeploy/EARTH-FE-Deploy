import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ProSidebar, MenuItem, Menu } from "react-pro-sidebar";
import { useStateContext } from "contexts/ContextProvider";
import body from "../../../../assets/images/Body.png";
import face1 from "../../../../assets/images/face1.png";
import face2 from "../../../../assets/images/face2.png";
import face3 from "../../../../assets/images/face3.png";
import themes from "../../../../themes/theme";
import links from "./sidebarlinks";
import "react-pro-sidebar/dist/css/styles.css";

const { tokens } = themes;

function Item({ title, to, icon, selected, setSelected }) {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "white",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}

function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { auth } = useStateContext();
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `linear-gradient(100deg, #262a67, #262a67)`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#9100FF !important",
        },
        "& .pro-menu-item.active": {
          color: "white !important",
          backgroundColor: "#3F418B",
          marginRight: isCollapsed ? "0.5px" : "29px",
          borderRadius: "15px",
        },
        fontFamily: "sans-serif",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon sx={{ color: "white" }} />
              ) : undefined
            }
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handleSettings}
              >
                <div
                  className="image-container"
                  style={{
                    background: colors.primary[400],
                    border: `5px solid ${colors.blueAccent[600]}`,
                  }}
                >
                  <div className="image">
                    <img alt="body" className="avatar" src={body} />
                    <img alt="face1" className="face face-1" src={face1} />
                    <img alt="face2" className="face face-2" src={face2} />
                    <img alt="face3" className="face face-3" src={face3} />
                  </div>
                </div>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="#fff"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {auth.username}
                </Typography>
                <Typography variant="h5" color="#C9BF81">
                  {auth.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {links.map((item) => (
              <Box key={item.title} sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    color: "white",
                    m: 2,
                    mt: 4,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Typography>
                {item.links.map((link) => (
                  <Item
                    title={link.name}
                    to={`/${link.path}`}
                    icon={link.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;

Item.defaultProps = {
  title: "",
  to: "",
  icon: null,
  selected: "",
  setSelected: "",
};

Item.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.elementType,
  selected: PropTypes.string,
  setSelected: PropTypes.string,
};
