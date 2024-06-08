import React from "react";
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';
import { v4 as uuidv4 } from 'uuid';

type PlaylistProps = {
  links: Array<string>;
  deleteHandler: (_: string)=> void;
};

function Playlist({ links, deleteHandler }: PlaylistProps) {
  return (
    <List sx={{ py: 0, alignItems: "center" }}>
      {links.map((link) => (
        <Paper sx={{ px: 2, mt: 1 }} key={uuidv4()}>
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={(event) => deleteHandler(link)}>
              <ClearIcon />
            </IconButton>
          }>
            <ListItemIcon>
              <DehazeIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary={link} primaryTypographyProps={{ fontSize: '25px' }} ></ListItemText>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}

export default Playlist;
