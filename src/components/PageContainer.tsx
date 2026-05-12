"use client";

import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {FunctionComponent, PropsWithChildren} from "react";

export const PageContainer: FunctionComponent<PropsWithChildren> = ({children}) => {
    const theme = createTheme({
        palette: {
            mode: "dark",
            background: {
                default: "#000",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
}
