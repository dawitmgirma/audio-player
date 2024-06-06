import React from "react";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';

type PlaylistProps = {
  link: string | undefined;
};

type KeyedLink = {link: string, id: string};

const keyLink = (link: string): KeyedLink => {
  return { link: link, id: `${link}${Date.now()}` };
}

function Playlist({ link }: PlaylistProps) {
  const [keyedLinksState, setKeyedLinksState] = React.useState(new Array<KeyedLink>());

  React.useEffect(() => {
    if (link) {
      setKeyedLinksState((keyedLinksState) => [...keyedLinksState, keyLink(link)]);
    }
  }, [link]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, idOfLink: string) => {
    setKeyedLinksState((keyedLinksState) => keyedLinksState.filter((keyedLink) => keyedLink.id !== idOfLink));
  }

  return (
    <List sx={{ py: 0, alignItems: "center" }}>
      {keyedLinksState.map((keyedLink) => (
        <Paper sx={{ px: 2, mt: 1 }} key={keyedLink.id}>
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={(event) => handleClick(event, keyedLink.id)}>
              <ClearIcon />
            </IconButton>
          }>
            <ListItemIcon>
              <DehazeIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary={keyedLink.link} primaryTypographyProps={{ fontSize: '25px' }} ></ListItemText>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}

export default Playlist;
