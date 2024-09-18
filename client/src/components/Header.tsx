import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";

function Header() {
  return (
    <>
      <AppBar position="fixed">
        <Typography variant="h4" component="h1" sx={{ p: 2 }}>
          Audio Player for Streamed Content
        </Typography>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
