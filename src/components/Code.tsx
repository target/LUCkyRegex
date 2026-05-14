"use client";

import { Box } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";

export const Code: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="span"
      sx={{
        fontFamily: "Monospace",
        background: "#222",
        p: "5px",
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: 1,
      }}
    >
      {children}
    </Box>
  );
};
