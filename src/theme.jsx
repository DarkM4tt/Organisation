import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Red Hat Display, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FAFAFA",
          "& .MuiOutlinedInput-root": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid gray",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid gray",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
            border: "1px solid #DDDDDD",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontFamily: "Red Hat Display, sans-serif",
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
