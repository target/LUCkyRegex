import type { Metadata } from "next";
import { FunctionComponent, PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import Script from "next/script";

export const metadata: Metadata = {
  title: "LUCkyRegex - Lucene regular expression tester",
  description:
    "Use this regular expression tester to test your Lucene regular expressions.",
};

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>

      <Script
        type="module"
        src="/LuceneNet/main.js"
        strategy="afterInteractive"
      />
    </body>
  </html>
);

export default RootLayout;
