import React from "react";
import { IconButton, Menu, MenuItem} from "@mui/material";
import { SlowMotionVideo } from "@mui/icons-material";

const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;
type PlaybackSpeed = typeof playbackSpeeds[number];

type PlaybackSpeedButtonProps = {
  speedHandler: (speed: PlaybackSpeed) => void;
  disabled: boolean;
};

export default function PlaybackSpeedButton({ speedHandler, disabled }: PlaybackSpeedButtonProps) {
  const [speed, setSpeed] = React.useState<PlaybackSpeed>(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget.dataset;
    const playbackSpeed = +(value ?? '0') as PlaybackSpeed; // should never return 0 
    setSpeed(playbackSpeed);
    speedHandler(playbackSpeed);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SlowMotionVideo />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open && !disabled}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {playbackSpeeds.map(playbackSpeed => 
          <MenuItem 
            key={playbackSpeed} 
            data-value={playbackSpeed} 
            onClick={handleClose}
            selected={speed === playbackSpeed}
          >
            {playbackSpeed}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}