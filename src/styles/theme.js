// import Color from "color";
import { createTheme } from "@mui/material/styles";

// Material UI Theming Docs: https://mui.com/customization/theming/
// Material UI Default Theme: https://mui.com/customization/default-theme/?expand-path=$.typography

import GTHaptikMediumWoff2 from '../assets/fonts/GT-Haptik-Medium-2.woff2';
import "@fontsource/arimo";

/* const paleGrey = "#F3F4F5";
const grey = "#73778C";
const darkGrey = "#474849";
const black = "#020228"; */

const gthaptikmedium = {
  fontFamily: 'GT-Haptik-Medium',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('GT-Haptik-Medium'),
    url(${GTHaptikMediumWoff2}) format('woff2')
  `,
};


let theme = createTheme({
  palette: {
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    primary: {
      light: '#67568c',
      main: process.env.REACT_APP_COLOR,
      dark: '#301e4e',
    },
    secondary: {
      main: '#ff6e6c',
    },
    text: {
      primary: "#1f1235",
      secondary: "#1b1425",
    },
    light: {
      main: "#FFFFFF",
    },
    icon: {
      primary: process.env.REACT_APP_COLOR,
    },
    link: {
      default: process.env.REACT_APP_COLOR,
    },
/*     grey: {
      300: paleGrey,
      700: grey,
      900: darkGrey,
    }, */
  },
  typography: {
    //fontSize: 16,
    button: {
      fontFamily: "GT-Haptik-Medium",
    },
    h1: {
      fontFamily: "GT-Haptik-Medium",
    },
    h2: {
      fontFamily: "GT-Haptik-Medium",
    },
    h3: {
      fontFamily: "GT-Haptik-Medium",
    },
    h4: {
      fontFamily: "GT-Haptik-Medium",
    },
    h5: {
      fontFamily: "GT-Haptik-Medium",
    },
    h6: {
      fontFamily: "GT-Haptik-Medium",
    },
    fontFamily: [
      'Arimo',
      'sans-serif',
    ].join(','),

    /* fontFamily: "Arimo",
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
    }, */
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [gthaptikmedium],
      },
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
          },
        },
      },
    },
  },
});

export default theme;