import React from "react";
import { Typography } from "@mui/material";

type PlaylistProps = {
  links: Array<string>;
};

function Playlist({ links }: PlaylistProps) {
  return (
    <>
      {links.map((link) => (
        <Typography
          variant="h4"
          component="h1"
          sx={{ m: -1, p: 2 }}
          key={`${link}${Date.now()}`}
        >
          {link}
        </Typography>
      ))}
    </>
  );
}

export default Playlist;
