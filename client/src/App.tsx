import React from "react";
import { Box, ThemeProvider, createTheme, Grid, Paper } from "@mui/material";
import {
  Header,
  Playlist,
  AudioPlayer,
  AddButton,
  KeyedLink,
} from "./components";
import CssBaseline from "@mui/material/CssBaseline";
import { v4 as uuidv4 } from "uuid";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [links, setLinks] = React.useState(new Array<KeyedLink>());
  const [selectedLink, setSelectedLink] = React.useState<string | undefined>(
    links[0]?.link,
  );

  function handleData(linkFromChild: string) {
    setLinks((links) => [...links, { link: linkFromChild, id: uuidv4() }]);
    if (!selectedLink) setSelectedLink(linkFromChild);
  }

  function handleDelete(linkToDelete: string) {
    setLinks((links) => {
      const newLinks = links.filter((link) => link.link !== linkToDelete);
      if (selectedLink === linkToDelete) setSelectedLink(newLinks[0]?.link);
      return newLinks;
    });
  }

  function handleReorder(source: number, destination: number) {
    const newLinks = Array.from(links);
    const keyedLink = newLinks[source];
    newLinks.splice(source, 1);
    newLinks.splice(destination, 0, { link: keyedLink.link, id: keyedLink.id }); // make copy
    setLinks(newLinks);
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
              <Playlist
                links={links}
                deleteHandler={handleDelete}
                reorderingHandler={handleReorder}
              ></Playlist>
            </Paper>
          </Grid>
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
              <AudioPlayer selectedLink={selectedLink}></AudioPlayer>
            </Paper>
          </Grid>
        </Grid>
        <AddButton
          links={links.map((link) => link.link)}
          dataHandler={handleData}
        ></AddButton>
      </Box>
    </ThemeProvider>
  );
}

export default App;
