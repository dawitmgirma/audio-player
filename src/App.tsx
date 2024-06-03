import React from "react";
import { Box, ThemeProvider, createTheme, Grid, Paper, makeStyles } from "@mui/material";

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
        <Grid container>
          <Grid xs={6}>
            <Paper elevation={5} sx={{m: 4, pt: 2, height:"85vh", maxHeight: "85vh", overflow: "auto"}}>
              <Playlist></Playlist>
            </Paper>  
          </Grid>
          <Grid xs={6}>
            <Paper elevation={5} sx={{m: 4, pt: 2, height:"85vh", maxHeight: "85vh", overflow: "auto"}}>
              <AudioPlayer></AudioPlayer>
            </Paper>            
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
