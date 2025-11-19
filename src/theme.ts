import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    risk: {
      low: string;
      medium: string;
      high: string;
    };
  }

  interface PaletteOptions {
    risk?: {
      low: string;
      medium: string;
      high: string;
    };
  }
}

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4ade80",
    },
    secondary: {
      main: "#5eead4",
    },
    background: {
      default: "#0c111d",
      paper: "#121826",
    },
    text: {
      primary: "#f6f7fb",
      secondary: "#94a3b8",
    },
    risk: {
      low: "#22c55e",
      medium: "#f97316",
      high: "#ef4444",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "system-ui", "sans-serif"].join(", "),
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle2: {
      letterSpacing: 0.4,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(148, 163, 184, 0.15)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0f172a",
          color: "#e2e8f0",
          borderRight: "1px solid rgba(148, 163, 184, 0.2)",
        },
      },
    },
  },
});

