import React from "react";
import styled from "styled-components";
import { tracks } from "../utils/Track";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicPlayer from "./MusicPlayer";
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
  align-text: start;
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
  ${"" /* margin-bottom: px; */}
  margin-left:-15px;
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
  dispaly: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary} !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
`;
const CreaterInfo = styled.div`
  dislay: flex;
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
export const DropdownButton = styled.button`
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

export const DropdownContent = styled.div`
 display: ${props => (props.show ? 'block' : 'none')};
 background-color: #f9f9f9;
 position:absolute;
 width: 120px;
 float:right;
 border-radius:4px;
`;

export const DropdownLink = styled.a`
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
  const [favoriteStatus, setFavoriteStatus] = useState(
    Array(tracks.length).fill(false)
  );

  const handleFavoriteClick = (index) => {
    const updatedFavoriteStatus = [...favoriteStatus];
    updatedFavoriteStatus[index] = !updatedFavoriteStatus[index];
    setFavoriteStatus(updatedFavoriteStatus);
  };

  
  const [songs, setSongs] = useState(tracks);
  const [isplaying, setisPlaying] = useState(false);
  const [currentsong, setCurrentSong] = useState(tracks[0]);
  const audioRef = useRef();
  useEffect(() => {
    if (isplaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isplaying]);

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setCurrentSong({
      ...currentsong,
      progress: (currentTime / duration) * 100,
      length: duration,
    });
  };
  const playCurrent = (index) => {
    setCurrentSong(tracks[index]);
    setisPlaying(true);
    audioRef.current.currentTime =  0 ;
    setisPlaying(!isplaying)
  };

  const [dropdownOpen, setDropdownOpen] = useState(Array(tracks.length).fill(false));

  const handleDropdownToggle = (index) => {
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = !newDropdownOpen[index];
    setDropdownOpen(newDropdownOpen);
  };
  const [isShowing, setIsShowing] = useState(false)

  const toggleModal = () => {
    setIsShowing(prevState => !prevState);
  };
  

  return (
    <div>
      <WholeCardContainer>
        {tracks.map((currentTrack, index) => {
          const creatorInitial = currentTrack.creater.charAt(0);
          const isFavorite = favoriteStatus[index];

          return (
            <CardWrapper key={index}>
              <CardContainer>
                <Top>
                  <Favorite>
                    <FavoriteIcon
                      onClick={() => handleFavoriteClick(index)}
                      style={{ color: isFavorite ? "red" : "white" }}
                    />
                  </Favorite>
                  <More>
                  <MoreVertIcon onClick={() => handleDropdownToggle(index)} />
                  <DropdownContent show={dropdownOpen[index]}>

                <DropdownLink  >Delete Song</DropdownLink>
                <DropdownLink >Update Song</DropdownLink>
                <button onClick={() => toggleModal(index)}>Close</button>
              </DropdownContent>
                  </More>
                  
                  
                  
                    <CardImage
                      src={currentTrack.thumbnail}
                      alt="audio avatar"
                    />
                 
                </Top>

                <CardTitle>
                  <p>{currentTrack.songName}</p>
                </CardTitle>
                <CardContent>
                  <p>{currentTrack.author}</p>
                </CardContent>
                <SpecialCardContent>
                  <p>{currentTrack.releaseDate}</p>
                </SpecialCardContent>
                <CreaterInfo>
                  <Creater>
                    <Avatar style={{ height: "30px", width: "30px" }}>
                      {creatorInitial}
                    </Avatar>
                    <CreaterName>{currentTrack.creater}</CreaterName>
                  </Creater>
                  
                </CreaterInfo>
                <PlayIcon>
                  <PlayArrowIcon onClick={() => playCurrent(index)}/>
                </PlayIcon>
              </CardContainer>
            </CardWrapper>
          );
        })}
      </WholeCardContainer>
      <audio src={currentsong.song} ref={audioRef} onTimeUpdate={onPlaying} />
      <MusicPlayer
        isplaying={isplaying}
        setisPlaying={setisPlaying}
        songs={songs}
        setSongs={setSongs}
        currentsong={currentsong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        playCurrent={playCurrent}
      />
    </div>
  );
};

export default MusicCard;
