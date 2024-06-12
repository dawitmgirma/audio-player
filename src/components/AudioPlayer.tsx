import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Slider,
  IconButton,
  Stack,
} from "@mui/material";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
  SkipPrevious,
  SkipNext,
  VolumeDownRounded,
  VolumeUpRounded
} from "@mui/icons-material";

type AudioPlayerProps = {
  selectedLink: string | undefined;
};

function AudioPlayer({ selectedLink }: AudioPlayerProps) {
  const [paused, setPaused] = React.useState(true);

  return (
    <>
      <Card sx={{ height: "50%" }}>
        <CardMedia
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          src={selectedLink}
        >
          {selectedLink ? (
            <audio controls autoPlay src={selectedLink}></audio>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                fontSize: "75px",
              }}
            >
              <MusicOffIcon fontSize="inherit" />
              <Typography variant="h4">Add a link to play.</Typography>
            </div>
          )}
        </CardMedia>
      </Card>
      <Box
        sx={{
          height: "50%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Slider
          size="small"
          valueLabelDisplay="off"
          sx={{ width: "60%", mt: 5}}
        />
        <Box
          sx={{
            width: "61%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -1,
          }}
        >
          <Typography fontSize="0.75rem">--:--</Typography>
          <Typography fontSize="0.75rem">--:--</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <IconButton>
            <SkipPrevious sx={{ fontSize: "60px" }} />
          </IconButton>
          <IconButton>
            <FastRewindRounded sx={{ fontSize: "60px" }} />
          </IconButton>
          <IconButton onClick={() => setPaused(!paused)}>
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: "75px" }} />
            ) : (
              <PauseRounded sx={{ fontSize: "75px" }} />
            )}
          </IconButton>
          <IconButton>
            <FastForwardRounded sx={{ fontSize: "60px" }} />
          </IconButton>
          <IconButton>
            <SkipNext sx={{ fontSize: "60px" }} />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mt: 3, px: 1, width: "50%" }} alignItems="center">
          <VolumeDownRounded />
          <Slider
            defaultValue={30}
          />
          <VolumeUpRounded />
        </Stack>
      </Box>
    </>
  );
}

export default AudioPlayer;
