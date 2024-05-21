import React from "react";
import { Box, AppBar, ThemeProvider } from "@mui/material";
import { pageTheme } from "./assets/PageTheme";

function App() {
  return (
    <ThemeProvider theme={pageTheme}>
      <Box>
        <AppBar sx={{ p: 2 }}>
          <h1>Audio Player for Streamed Content</h1>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
