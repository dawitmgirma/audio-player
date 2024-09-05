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
import {
  PauseRounded,
  PlayArrowRounded,
  SkipPrevious,
  SkipNext,
  VolumeDownRounded,
  VolumeUpRounded,
  MusicOff,
  Replay10,
  Forward10,
} from "@mui/icons-material";

type AudioPlayerProps = {
  selectedLink: string | undefined;
};

function AudioPlayer({ selectedLink }: AudioPlayerProps) {
  const audioPlayerId = "audio-player";
  const [paused, setPaused] = React.useState(!!!selectedLink);
  const [position, setPosition] = React.useState<number | undefined>(undefined);
  const [endTime, setEndTime] = React.useState<number | undefined>(undefined);

  function formatDuration(time: number | undefined): string {
    if (time === undefined) return "--:--";

    const dateObj = new Date(time * 1000);
    const hours = dateObj.getUTCHours();
    const timeString = dateObj.toUTCString().split(' ')[4];
    
    return hours ? timeString : timeString.substring(timeString.indexOf(":") + 1);
  }

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
        >
          {selectedLink ? (
            <audio
              controls
              autoPlay
              id={audioPlayerId}
              src={selectedLink}
              onPlay={() => setPaused(false)}
              onPause={() => setPaused(true)}
              onDurationChange={(event) => {
                setPosition(0);
                setEndTime(event.currentTarget.duration);
              }}
              onTimeUpdate={event => setPosition(event.currentTarget.currentTime)}
            ></audio>
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
              <MusicOff fontSize="inherit" />
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
          value={position}
          onChange={(_, value) => {
            const newPos = value as number; // will never have array since it is not ranged slider
            setPosition(newPos);
            const audioPlayer: HTMLAudioElement = document.getElementById(
              audioPlayerId,
            ) as HTMLAudioElement;

            audioPlayer.currentTime = newPos;
          }} 
          sx={{ width: "60%", mt: 5 }}
          disabled={[position, endTime].includes(undefined)}
          max={endTime}
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
          <Typography fontSize="0.75rem">{formatDuration(position)}</Typography>
          <Typography fontSize="0.75rem">{formatDuration(endTime)}</Typography>
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
            <Replay10 sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              if (!selectedLink) return;

              const audioPlayer: HTMLAudioElement = document.getElementById(
                audioPlayerId,
              ) as HTMLAudioElement;

              if (paused) {
                audioPlayer.play();
              } else {
                audioPlayer.pause();
              }
            }}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: "75px" }} />
            ) : (
              <PauseRounded sx={{ fontSize: "75px" }} />
            )}
          </IconButton>
          <IconButton>
            <Forward10 sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton>
            <SkipNext sx={{ fontSize: "60px" }} />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mt: 3, px: 1, width: "50%" }}
          alignItems="center"
        >
          <VolumeDownRounded />
          <Slider defaultValue={30} />
          <VolumeUpRounded />
        </Stack>
      </Box>
    </>
  );
}

export default AudioPlayer;
