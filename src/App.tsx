import React from "react";
import { Box, ThemeProvider, createTheme, Grid } from "@mui/material";
import { Header, Playlist, AudioPlayer } from "./components";
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid>
            <Playlist></Playlist>
          </Grid>
          <Grid>
            <AudioPlayer></AudioPlayer>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
