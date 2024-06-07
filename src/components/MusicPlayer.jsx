import React, { useRef } from "react";
import styled from "styled-components";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";


export const MusicPlayerContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; /* Subtract scrollbar width from 100%  #1c1e27*/
  background-color:${({ theme }) => theme.bg};
  color: #ffffff;
  padding: 16px 40px;
  z-index: 9999;
  height: 45px;
  display: flex;
  border:2px solid purple;
  @media (460px < width < 1200px) {
    padding: 16px 20px; /* Adjust the padding for smaller screens */
  }
`;
export const PlayerImage = styled.img`
  width: 90px;
  height: 60px;
  border-radius: 5px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center !important;
  

  margin-left: 250px;
  @media (460px < width < 1200px) {
    margin-left: 20px;
  }
`;
export const Button = styled.button`
  background: transparent;
  border: none;
  color: white;
  color: ${({ theme }) => theme.text_primary};
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 70px;
  @media (460px < width < 1200px) {
    margin-left: 0px;
  }
`;
export const ProgressContainer = styled.div`
  width: 35%;
  height: 8px;
  background: purple;
  margin-top: 15px;
  border-radius: 4px;
  margin-left: 100px;
 
  @media (460px < width < 1200px) {
    width: 35%;
    margin-left: 15px;
  }
`;

export const ProgressBar = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.text_primary};
  
`;
const MusicPlayer = ({
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
}) => {
  const clickRef = useRef();
  const TogglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  // progress bar sneneka wede audiow yetenekabet bota yalewn music endil
  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = (offset / width) * 100;
    audioRef.current.currentTime = (divprogress / 100) * currentSong.length;
  
  };
  const skipNext = () => {
    const index = songs.findIndex((song) => song.title === currentSong.title);

    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
  };
  const skipBack = () => {
    const index = songs.findIndex((song) => song.title === currentSong.title);

    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
  };
  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };
  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };
  return (
    <MusicPlayerContainer>
      <ImageContainer>
        <PlayerImage src={currentSong.cover_photo} alt="Player Image" />
      </ImageContainer>

      <ButtonContainer>
        <Button>
          <SkipPreviousRoundedIcon onClick={skipBack} />
        </Button>
        <Button>
          <FastRewindRoundedIcon onClick={skipBackward} />
        </Button>
        <Button>
          {isPlaying ? (
            <PauseRoundedIcon onClick={TogglePlayPause} />
          ) : (
            <PlayArrowRoundedIcon onClick={TogglePlayPause} />
          )}
        </Button>
        <Button>
          <FastForwardRoundedIcon onClick={skipForward} />
        </Button>
        <Button>
          <SkipNextRoundedIcon onClick={skipNext} />
        </Button>
      </ButtonContainer>
      <ProgressContainer onClick={checkWidth} ref={clickRef}>
        <ProgressBar style={{ width: `${currentSong.progress + "%"}` }} />
      </ProgressContainer>
    </MusicPlayerContainer>
  );
};

export default MusicPlayer;
