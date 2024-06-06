import React from "react";
import { Box, ThemeProvider, createTheme, Grid, Paper } from "@mui/material";

import { Header, Playlist, AudioPlayer, AddButton } from "./components";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [link, setLink] = React.useState<string | undefined>();

  function handleData(linkFromChild: string) {
    setLink(linkFromChild);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <Header></Header>
        <Grid container>
          <Grid xs={6}>
            <Paper
              elevation={5}
              sx={{
                m: 4,
                height: "85vh",
                maxHeight: "85vh",
                overflow: "auto",
                overflowX: "hidden",
              }}
            >
              <Playlist link={link}></Playlist>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper
              elevation={5}
              sx={{
                m: 4,
                pt: 2,
                height: "85vh",
                maxHeight: "85vh",
                overflow: "auto",
                overflowX: "hidden",
              }}
            >
              <AudioPlayer></AudioPlayer>
            </Paper>
          </Grid>
        </Grid>
        <AddButton dataHandler={handleData}></AddButton>
      </Box>
    </ThemeProvider>
  );
}

export default App;
