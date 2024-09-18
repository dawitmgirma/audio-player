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
  VolumeOff,
  MusicOff,
  Replay10,
  Forward10,
  Shuffle,
  ShuffleOn,
  Repeat,
  RepeatOn,
  RepeatOneOn,
} from "@mui/icons-material";

import PlaybackSpeedButton from "./PlaybackSpeedButton";
import AudioMotionAnalyzer from 'audiomotion-analyzer';

type AudioPlayerProps = {
  selectedLink: string | undefined;
};

enum RepeatState {
  Off = 0,
  On,
  OnSame,
};

function AudioPlayer({ selectedLink }: AudioPlayerProps) {
  // returns time into string duration for slider
  function formatDuration(time: number | undefined): string {
    if (time === undefined) return "--:--";

    const dateObj = new Date(time * 1000);
    const hours = dateObj.getUTCHours();
    const timeString = dateObj.toUTCString().split(' ')[4];
    
    return hours ? timeString : timeString.substring(timeString.indexOf(":") + 1);
  }

  // returns audio player given html id
  function fetchAudioPlayer(audioPlayerId: string): HTMLAudioElement {
    const audioPlayer: HTMLAudioElement = document.getElementById(
      audioPlayerId,
    ) as HTMLAudioElement;

    return audioPlayer;
  }
    
  const audioPlayerId = "audio-player";
  const audioPlayerContainerId = "audio-player-container";
  const [paused, setPaused] = React.useState(!!!selectedLink);
  const [muted, setMuted] = React.useState(false);
  const [position, setPosition] = React.useState<number>();
  const [endTime, setEndTime] = React.useState<number>();
  const [volume, setVolume] = React.useState<number>();
  const [shuffle, setShuffle] = React.useState(false);
  const [repeat, setRepeat] = React.useState(RepeatState.Off);
  // const [audioVisualizer, setAudioVisualizer] = React.useState<AudioMotionAnalyzer>();

  const audioVisualizer = new AudioMotionAnalyzer(document.getElementById(audioPlayerContainerId) ?? undefined, {
    start: false
  });

  return (
    <>
      <Card sx={{ height: "50%" }}>
        <CardMedia
          id={audioPlayerContainerId}
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
              crossOrigin="anonymous"
              id={audioPlayerId}
              src={selectedLink}
              onPlay={() => setPaused(false)}
              onPause={() => setPaused(true)}
              onVolumeChange={(event) => {
                setMuted(!event.currentTarget.volume ? true : event.currentTarget.muted);
              }}
              onDurationChange={(event) => {
                setPosition(0);
                setEndTime(event.currentTarget.duration);
                setVolume(event.currentTarget.volume);
                audioVisualizer.connectInput(fetchAudioPlayer(audioPlayerId));
                audioVisualizer.start();
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
          value={position ?? 0}
          onChange={(_, value) => {
            const newPos = value as number; // will never have array since it is not ranged slider
            setPosition(newPos);

            fetchAudioPlayer(audioPlayerId).currentTime = newPos;
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
            mt: 2,
          }}
        >
          <IconButton>
            <SkipPrevious sx={{ fontSize: "60px" }} />
          </IconButton>
          <IconButton
            onClick={() => fetchAudioPlayer(audioPlayerId).currentTime -= 10}
          >
            <Replay10 sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              if (!selectedLink) return;

              const audioPlayer = fetchAudioPlayer(audioPlayerId);

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
          <IconButton
            onClick={() => fetchAudioPlayer(audioPlayerId).currentTime += 10}
          >
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
          <IconButton
            onClick={() => {
              fetchAudioPlayer(audioPlayerId).muted = !fetchAudioPlayer(audioPlayerId).muted;
            }}
          >
            {muted ? <VolumeOff /> : <VolumeDownRounded />}
          </IconButton>
          <Slider 
            value={volume && !muted ? volume: 0}
            onChange={(_, value) => {
              const newVolume = value as number; // will never have array since it is not ranged slider
              setVolume(newVolume);
              fetchAudioPlayer(audioPlayerId).volume = newVolume;
            }}
            disabled={volume === undefined}
            max={1}
            step={0.01}
          />
          <VolumeUpRounded />
        </Stack>
        <Stack
          spacing={10}
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <IconButton
            onClick={() => setShuffle(!shuffle)}
          >
            {shuffle? <ShuffleOn /> : <Shuffle />}
          </IconButton>
          <PlaybackSpeedButton speedHandler={(speed) => {
            fetchAudioPlayer(audioPlayerId).playbackRate = speed;
          }}/>
          <IconButton
            onClick={() => setRepeat((repeat + 1) % 3)}
          >
            {!repeat? <Repeat /> : (
              repeat === RepeatState.On? <RepeatOn /> : <RepeatOneOn />
            )}
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}

export default AudioPlayer;

/*
  TODO: 
    - disable speed menu
    - add visualization for audio
    - fix resetting of audio player after deletion of file from playlist
    - shuffle, repeat, autoplay
    - check audio source validity
    - add different audio sources
    - consolidate state
    - better error handling
    - abstract theme and website design into its own file
*/
