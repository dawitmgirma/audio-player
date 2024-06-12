import React from "react";
import { Fab, Fade, Popper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddButtonProps = {
  links: Array<string>;
  dataHandler: (link: string) => void;
};

function AddButton({ links, dataHandler }: AddButtonProps) {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [link, setLink] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (!error) {
      document.getElementById("addButton")?.click();
      dataHandler(link);
    }
  };

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Fab
        id="addButton"
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        color="default"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
      <Popper
        id={id}
        open={open}
        anchorEl={anchor}
        placement="left-end"
        disablePortal={true}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                required
                sx={{ width: "42.25vw" }}
                id="filled-basic"
                label="Add link to playlist"
                variant="filled"
                onChange={(e) => {
                  const linkExcerpt = e.target.value;
                  setError(links.includes(linkExcerpt));
                  return setLink(linkExcerpt);
                }}
                error={error}
                helperText={error ? "Link is already in playlist" : ""}
              />
            </form>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default AddButton;
