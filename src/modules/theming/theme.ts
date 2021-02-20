import { createMuiTheme } from "@material-ui/core";
import { common, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
      contrastText: common.white,
    },
    secondary: {
      main: blue[500],
      contrastText: common.white,
    },
  },
});

export default theme;
