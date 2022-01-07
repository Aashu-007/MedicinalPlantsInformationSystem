import { createTheme } from "@mui/material/styles";
import orange from "@mui/material/colors/orange";
import green from "@mui/material/colors/green";

const theme = createTheme({
  palette: {
    primary: {
      main: green[700],
    },
    secondary: {
      main: orange[600],
    },
  },
});

export default theme;