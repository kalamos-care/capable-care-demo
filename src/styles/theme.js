import Color from "color";
import { createTheme } from "@mui/material/styles";

import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";

// Material UI Theming Docs: https://mui.com/customization/theming/
// Material UI Default Theme: https://mui.com/customization/default-theme/?expand-path=$.typography

const paleGrey = "#F3F4F5";
const grey = "#73778C";
const darkGrey = "#474849";
const black = "#020228";

let theme = createTheme({
  palette: {
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    primary: {
      main: process.env.REACT_APP_COLOR,
      light: Color(process.env.REACT_APP_COLOR).lightness(95).hex(),
    },
    secondary: {
      main: "#333333",
    },
    light: {
      main: "#FFFFFF",
    },
    text: {
      primary: black,
      card: "#1c1c1e",
    },
    icon: {
      primary: process.env.REACT_APP_COLOR,
    },
    link: {
      default: process.env.REACT_APP_COLOR,
    },
    grey: {
      300: paleGrey,
      700: grey,
      900: darkGrey,
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "Rubik",
    // body1 is the default, body2 is an alt (used for rich text in this app)
    body2: {
      fontSize: 14,
      color: darkGrey,
      h1: {
        fontSize: "1.75rem",
        color: black,
      },
      h2: {
        fontSize: "1.5rem",
        color: black,
      },
      h3: {
        fontSize: "1.25rem",
        color: black,
      },
      h4: {
        fontSize: "1rem",
        color: black,
      },
      h5: {
        fontSize: "0.875rem",
        color: black,
      },
      h6: {
        fontSize: "0.75rem",
        color: black,
      },
    },
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.75rem",
    },
    h4: {
      fontSize: "1.5rem",
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    h7: {
      fontSize: "0.9rem",
      fontWeight: 400,
      color: black,
    },
    headline: {
      color: black,
      fontSize: "1.25rem",
      lineHeight: "2rem",
      letterSpacing: -0.25,
      fontWeight: 500,
    },
    subtitle: {
      fontWeight: 400,
      fontSize: "1rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      color: black,
    },
    eyebrow: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      color: grey,
    },
    small: {
      textTransform: "uppercase",
      fontSize: "0.625rem",
      letterSpacing: "0.25px",
      opacity: "0.7",
      color: "#FFFFFF",
    },
    modal: {
      fontWeight: 400,
      fontSize: "0.875rem",
      color: darkGrey,
      textAlign: "center",
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          padding: "0.5rem",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        label: {
          fontSize: "0.875rem",
          "&.Mui-selected": {
            fontSize: "0.875rem",
            color: "black",
          },
        },
      },
    },
  },
});

export default theme;
