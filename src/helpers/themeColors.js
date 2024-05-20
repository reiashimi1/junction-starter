import { createTheme } from "@mui/material";
import { blue, blueGrey, green, purple, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      blue100: blue[100],
      blue200: blue[200],
      blue300: blue[300],
      blue400: blue[400],
      main: blue[500],
      blue600: blue[600],
      blue700: blue[700],
      blue800: blue[800],
      blue900: blue[900],
      blueA200: blue["A200"],
      blueA400: blue["A400"],
      blueA700: blue["A700"],
    },
    red: {
      red100: red[100],
      red500: red[500],
      red800: red[800],
      redA400: red["A400"],
    },
    green: {
      green100: green[100],
      green500: green[500],
      green800: green[800],
      greenA700: green["A700"],
    },
    blueGrey: {
      blueGrey100: blueGrey[100],
      blueGrey200: blueGrey[200],
      blueGrey300: blueGrey[300],
      blueGrey400: blueGrey[400],
      main: blueGrey[500],
      blueGrey600: blueGrey[600],
      blueGrey700: blueGrey[700],
      blueGrey800: blueGrey[800],
      blueGrey900: blueGrey[900],
      blueGreyA200: blueGrey["A200"],
      blueGreyA400: blueGrey["A400"],
      blueGreyA700: blueGrey["A700"],
    },
    purple: {
      purple100: purple[100],
      purple200: purple[200],
      purple300: purple[300],
      purple400: purple[400],
      main: purple[500],
      purple700: purple[700],
      purple800: purple[800],
      purple900: purple[900],
      purpleA400: purple["A400"],
      purpleA700: purple["A700"],
    },
  },
});
