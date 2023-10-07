import { Typography, Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import themes from "../../../themes/theme";

const { tokens } = themes;

function Header({ title, subtitle, ...rest }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box {...rest}>
      <Typography
        variant="h2"
        color={colors.blueAccent[300]}
        fontWeight="bold"
        sx={{
          m: "0 0 5px 0",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={colors.grey[400]}
        fontWeight={600}
        sx={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;

Header.defaultProps = {
  title: "",
  subtitle: "",
};

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
