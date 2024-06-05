import React from "react";
import { Fab, Fade, Popper, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type handlerFunction = (link: string) => void;
type AddButtonProps = {
  dataHandler: handlerFunction;
};

function AddButton({ dataHandler }: AddButtonProps) {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [link, setLink] = React.useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    document.getElementById("addButton")?.click();
    dataHandler(link);
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
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ width: "42.25vw" }}
                id="filled-basic"
                label="Add link to playlist"
                variant="filled"
                onChange={(e) => setLink(e.target.value)}
              />
            </form>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default AddButton;
