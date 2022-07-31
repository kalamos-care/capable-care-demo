// import Color from "color";
import { createTheme } from "@mui/material/styles";

// Material UI Theming Docs: https://mui.com/customization/theming/
// Material UI Default Theme: https://mui.com/customization/default-theme/?expand-path=$.typography

import GTHaptikMediumWoff from '../assets/fonts/GT-Haptik-Medium.woff2';
import "@fontsource/arimo";

const gthaptikmedium = {
  fontFamily: 'GT-Haptik-Medium',
/*   fontStyle: 'normal',
  fontWeight: 400, */
  src: `
    local('GT-Haptik-Medium'),
    url(${GTHaptikMediumWoff}) format('woff2')
  `,
};

const theme = createTheme({
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
    /*     light: {
          main: "#FFFFFF",
        }, */
    icon: {
      primary: process.env.REACT_APP_COLOR,
    },
    link: {
      default: process.env.REACT_APP_COLOR,
    },
  },
  typography: {
    fontFamily: [
      'GT-Haptik-Medium',
      'Arimo',
      'sans-serif',
    ].join(','),
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': gthaptikmedium,
        },
      },
    },
    fontSize: 16,
    button: {
      fontFamily: 'GT-Haptik-Medium',
    },
    h1: {
      fontFamily: 'GT-Haptik-Medium',
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: 'GT-Haptik-Medium',
      fontSize: "2rem",
    },
    h3: {
      fontFamily: 'GT-Haptik-Medium',
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: "GT-Haptik-Medium",
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: "GT-Haptik-Medium",
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: "GT-Haptik-Medium",
      fontSize: "1rem",
      fontWeight: 400,
    },
    // body1 is the default, body2 is an alt (used for rich text in this app)
    body2: {
      fontSize: 14,
      //color: darkGrey,
      h1: {
        fontSize: "1.75rem",
      },
      h2: {
        fontSize: "1.5rem",
      },
      h3: {
        fontSize: "1.25rem",
      },
      h4: {
        fontSize: "1rem",
      },
      h5: {
        fontSize: "0.875rem",
      },
      h6: {
        fontSize: "0.75rem",
      },
    },
    h7: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    headline: {
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
    },
    eyebrow: {
      fontSize: "0.75rem",
      lineHeight: "1rem",
      // color: grey,
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
      //color: darkGrey,
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
          },
        },
      },
    },
  },
});

export default theme;