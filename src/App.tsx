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
  const [links, setLinks] = React.useState(new Array<string>());

  function handleData(linkFromChild: string) {
    setLinks((links) => [...links, linkFromChild]);
  }

  function handleDelete(linkToDelete: string) {
    setLinks((links) => links.filter((link) => link !== linkToDelete));
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
              <Playlist links={links} deleteHandler={handleDelete}></Playlist>
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
        <AddButton links={links} dataHandler={handleData}></AddButton>
      </Box>
    </ThemeProvider>
  );
}

export default App;
