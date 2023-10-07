import { Box, Typography, useTheme } from "@mui/material";
import PropTypes, { elementType } from "prop-types";
import themes from "../../../themes/theme";
import ProgressCircle from "./ProgressCircle";

const { tokens } = themes;

function StatBox({ title, subtitle, icon, progress, increase }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[300] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[300] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatBox;

StatBox.defaultProps = {
  title: "",
  subtitle: "",
  icon: null,
  progress: "",
  increase: "",
};

StatBox.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: elementType,
  progress: PropTypes.string,
  increase: PropTypes.string,
};
