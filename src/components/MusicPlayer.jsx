import React from 'react';
import styled from 'styled-components';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Four from '../utils/Fourr.jpg'

const MusicPlayerContainer=  styled.footer`
 position: fixed;
  bottom: 0;
  left: 0;
  width: 96%; /* Subtract scrollbar width from 100% */
  background: #1C1E27;
  color: #ffffff;
  padding: 20px;
  z-index: 9999;
  height:45px;
  display:flex;
  

`;
const PlayerImage=styled.img`
width:90px;
height:60px;
border-radius:5px;

`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center !important;
  
  margin-left:250px;
`;
const Button = styled.button`
  background: transparent; 
  border: none; 
  color:white;
  
`;

const ImageContainer = styled.div`
display:flex;
align-items:center;
margin-left:70px;

`;
const ProgressContainer = styled.div`
  width: 35%;
  height: 8px;
  background: #4d4d4d;
  margin-top: 15px;
   border-radius:4px;
   margin-left:100px;
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: #ffffff;
`;
const MusicPlayer = () => {
  const progress = 50;
  
  return (
    <MusicPlayerContainer>
    <ImageContainer>
      <PlayerImage  src={Four} alt="Player Image" />
      </ImageContainer>
    
    
      <ButtonContainer>
        <Button>
          <SkipPreviousRoundedIcon />
        </Button>
        <Button>
          <FastRewindRoundedIcon />
        </Button>
        <Button>
          <PlayArrowRoundedIcon />
        </Button>
        <Button>
          <FastForwardRoundedIcon />
        </Button>
        <Button>
          <SkipNextRoundedIcon />
        </Button>
      </ButtonContainer>
      <ProgressContainer>
        <ProgressBar progress={progress} />
      </ProgressContainer>
      
    </MusicPlayerContainer>
  )
}

export default MusicPlayer