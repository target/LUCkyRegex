"use client";
import StyledComponentsRegistry from "@/lib/registry";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

export default function PageContainer(props: { children: React.ReactNode }) {
  const { children } = props;
  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#000",
      },
    },
  });
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
