// export default MusicCard;
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicPlayer from "./MusicPlayer";

// Styled components
import MoreVertIcon from '@mui/icons-material/MoreVert';

const WholeCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 18px 6px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const CardContainer = styled.div`
  max-width: 200px;
  height: 260px;
  padding: 16px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 6px;
  margin-left: 2px;
  margin-bottom: 20px;
  border: 2px solid #a9a9a9;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.04s ease-in-out;
    filter: brightness(1.3);
  }
`;

const CardWrapper = styled.div`
  margin: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-top: -20px;
  margin-bottom: 10px;
  margin-left: -15px;
  text-align: start;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const CardContent = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  margin-top: -40px;
  margin-left: -15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const SpecialCardContent = styled(CardContent)`
  font-weight: 500;
  margin-bottom: 0px;
`;

const CardImage = styled.img`
  width: 220px;
  height: 150px;
  margin-top: -10px;
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  max-width: 250px;
`;

const Favorite = styled(IconButton)`
  color: white !important;
  top: 1px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary} !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
`;

const CreaterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 1px;
  margin-left: -120px;
`;

const Creater = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CreaterName = styled.div`
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #9000ff !important;
  color: white !important;
  backdrop-filter: blur(4px);
  position: absolute !important;
  top: 45%;
  right: 10%;
  display: none;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 16px 4px #9000ff50 !important;
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
  ${CardContainer}:hover & {
    display: flex;
  }
`;
const More = styled(IconButton)`
  color: white !important;
  bottom: -120px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  dispaly: flex;
  align-items: center;
  position: absolute !important;

`;
const DropdownButton = styled.button`
  border: none;
 margin-left:200px;
 margin-top:-10px;
 background-color:transparent;
 width:10px;
 height:10px;
 svg {
 font-size: 20px; /* Adjust the size here */
}
`;

const DropdownContent = styled.div`
 display: ${props => (props.show ? 'block' : 'none')};
 background-color: #f9f9f9;
 position:absolute;
 width: 120px;
 float:right;
 border-radius:4px;
`;

const DropdownLink = styled.a`
 color: black;
 padding: 12px 16px;
 text-decoration: none;
 display: block;
 font-size:14px;

 &:hover {
   background-color: purple;
 }
`;
const MusicCard = () => {
  const [tracks, setTracks] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/song/')
      .then(response => {
        setTracks(response.data);
        setFavoriteStatus(new Array(response.data.length).fill(false));
        setCurrentSong(response.data[0]); // Set the initial song if available
      })
      .catch(error => {
        console.error('Error fetching the data', error);
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleFavoriteClick = (index) => {
    const updatedFavoriteStatus = [...favoriteStatus];
    updatedFavoriteStatus[index] = !updatedFavoriteStatus[index];
    setFavoriteStatus(updatedFavoriteStatus);
  };

  const onPlaying = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const curentTime = audioRef.current.currentTime;
      setCurrentSong({
        ...currentSong,
        progress: (curentTime / duration) * 100,
        length: duration,
      });
    }
  };

  const playCurrent = (index) => {
    setCurrentSong(tracks[index]);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(!isPlaying);

  };

  return (
    <div>
      <WholeCardContainer>
        {tracks.map((currentTrack, index) => {
          const creatorInitial = currentTrack.user.username.charAt(0);
          const isFavorite = favoriteStatus[index];

          // console.log(currentSong);
          return (

            <CardWrapper key={index}>
              <CardContainer>
                <Top>
                  <Favorite>
                    <FavoriteIcon
                      onClick={() => handleFavoriteClick(index)}
                      style={{ color: isFavorite ? 'red' : 'white' }}
                    />
                  </Favorite>
                  <CardImage
                    src={currentTrack.cover_photo}
                    alt="audio avatar"
                  />
                </Top>
                <CardTitle>
                  <p>{currentTrack.title}</p>
                </CardTitle>
                <CardContent>
                  <p>{currentTrack.artist}</p>
                </CardContent>
                <SpecialCardContent>
                  <p>{currentTrack.release_date}</p>
                </SpecialCardContent>
                <CreaterInfo>
                  <Creater>
                    <Avatar style={{ height: '30px', width: '30px' }}>
                      {creatorInitial}
                    </Avatar>
                    <CreaterName>{currentTrack.user.username}</CreaterName>
                  </Creater>
                  
                </CreaterInfo>
                <PlayIcon>
                  <PlayArrowIcon onClick={() => playCurrent(index)} />
                </PlayIcon>
              </CardContainer>
            </CardWrapper>
          );
        })}
      </WholeCardContainer>
      {currentSong && (
        <audio src={currentSong.audio_file} ref={audioRef} onTimeUpdate={onPlaying} />
      )}
      {currentSong && (
        <MusicPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={tracks}
          setSongs={setTracks}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          
        />
      )}
    </div>
  );
};

export default MusicCard;
