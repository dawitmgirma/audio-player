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
import { pageTheme } from "../assets/PageTheme";

type AudioPlayerProps = {
  selectedLink: string | undefined;
};

type AudioControlState = {
  paused: boolean,
  muted: boolean,
  position: number | undefined,
  endTime: number | undefined,
  volume: number | undefined,
  audioVisualizer: AudioMotionAnalyzer | undefined
}

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
  const initialAudioControls: AudioControlState = {
    paused: true,
    muted: false,
    position: undefined,
    endTime: undefined,
    volume: undefined,
    audioVisualizer: undefined,
  };
  const [audioControls, setAudioControls] = React.useState(initialAudioControls);
  const [shuffle, setShuffle] = React.useState(false);
  const [repeat, setRepeat] = React.useState(RepeatState.Off);
  const [disabled, setDisabled] = React.useState(!selectedLink);

  const disabledSx = {
    "&.Mui-disabled": {
      color: pageTheme.palette.action.active
    }
  }; // temporary until theme clean up

  React.useEffect(() => {
    if (!selectedLink) {
      audioControls.audioVisualizer?.destroy();
      setAudioControls(initialAudioControls);
      setDisabled(true);
    }
  }, [selectedLink]);

  return (
    <>
      <Card sx={{ height: "50%" }}>
        {selectedLink ? (<div
          id={audioPlayerContainerId}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <audio
              preload="auto"
              crossOrigin="anonymous"
              id={audioPlayerId}
              src={`http://localhost:3001/audio/${encodeURIComponent(selectedLink)}`}
              onPause={() => setAudioControls({...audioControls, paused: true})}
              onPlay={() => setAudioControls({...audioControls, paused: false})}
              onVolumeChange={(event) => {
                setAudioControls({
                  ...audioControls,
                  muted: !event.currentTarget.volume ? true : event.currentTarget.muted
                });
              }}
              onDurationChange={(event) => {
                setDisabled(false);
                setAudioControls({
                  ...audioControls,
                  position: 0,
                  endTime: event.currentTarget.duration,
                  volume: event.currentTarget.volume,
                  audioVisualizer: new AudioMotionAnalyzer(
                    document.getElementById(audioPlayerContainerId) ?? undefined,
                    { source: fetchAudioPlayer(audioPlayerId) }
                  ),
                });
              }}
              onTimeUpdate={event => setAudioControls({...audioControls, position: event.currentTarget.currentTime})}
            ></audio></div>
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
          value={audioControls.position ?? 0}
          onChange={(_, value) => {
            const newPos = value as number; // will never have array since it is not ranged slider
            fetchAudioPlayer(audioPlayerId).currentTime = newPos;
          }} 
          sx={{ width: "60%", mt: 5 }}
          disabled={disabled}
          max={audioControls.endTime}
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
          <Typography fontSize="0.75rem">{formatDuration(audioControls.position)}</Typography>
          <Typography fontSize="0.75rem">{formatDuration(audioControls.endTime)}</Typography>
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
            disabled={disabled}
            sx={disabledSx}
          >
            <Replay10 sx={{ fontSize: "40px" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              if (!selectedLink) return;

              const audioPlayer = fetchAudioPlayer(audioPlayerId);

              if (audioControls.paused) {
                audioPlayer.play().catch(_ => audioPlayer.pause());
              } else {
                audioPlayer.pause();
              }
            }}
            disabled={disabled}
            sx={disabledSx}
          >
            {audioControls.paused ? (
              <PlayArrowRounded sx={{ fontSize: "75px" }} />
            ) : (
              <PauseRounded sx={{ fontSize: "75px" }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => fetchAudioPlayer(audioPlayerId).currentTime += 10}
            disabled={disabled}
            sx={disabledSx}
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
            disabled={disabled}
            sx={disabledSx}
          >
            {audioControls.muted ? <VolumeOff /> : <VolumeDownRounded />}
          </IconButton>
          <Slider 
            value={audioControls.volume && !audioControls.muted ? audioControls.volume: 0}
            onChange={(_, value) => {
              const newVolume = value as number; // will never have array since it is not ranged slider
              setAudioControls({...audioControls, volume: newVolume});
              fetchAudioPlayer(audioPlayerId).volume = newVolume;
            }}
            disabled={disabled}
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
          <PlaybackSpeedButton 
            speedHandler={(speed) => {
              fetchAudioPlayer(audioPlayerId).playbackRate = speed;
            }} 
            disabled={disabled}
          />
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
    - disable logic
    - shuffle, repeat, autoplay
    - check audio source validity
    - add different audio sources
    - consolidate state
    - better error handling
    - abstract theme and website design into its own file
*/
