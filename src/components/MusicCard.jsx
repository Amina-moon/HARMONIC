import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicPlayer from "./MusicPlayer";
import { handleFavoriteClick } from "../utils/handleFavourite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "react-modal";
import axiosInstance from "./AxiosInstance";
import {
  WholeCardContainer,
  CardContainer,
  CardWrapper,
  Top,
  CardTitle,
  CardContent,
  SpecialCardContent,
  CardImage,
  Favorite,
  CreaterInfo,
  Creater,
  CreaterName,
  PlayIcon,
  More,
  DropdownContent,
  DropdownButton,
} from "../style/MusicCardStyle";

const MusicCard = () => {
  const [trackList, setTrackList] = useState([]);
  const [tracks, setTracks] = useState({});
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/song/")
      .then((response) => {
        const trackData = response.data.reduce((acc, track) => {
          acc[track.id] = track;
          return acc;
        }, {});
        setTracks(trackData);
        setTrackList(response.data);
        setCurrentSong(response.data[0]); // Set the initial song if available
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/api/favourite/list/")
      .then((response) => {
        setFavoriteStatus(response.data);
        const favouriteTrackData = response.data.reduce((acc, track) => {
          acc[track.id] = track;
          return acc;
        }, {});
        setFavoriteStatus(favouriteTrackData);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
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

  const handleDropdownClick = (trackId) => {
    setDropdownVisible((prev) => (prev === trackId ? null : trackId));
  };

  const handleUpdate = (trackId) => {
    // Handle the update action here
    console.log(`Update track with ID: ${trackId}`);
  };

  const handleDelete = (trackId) => {
    // Handle the delete action here
    console.log(`Delete track with ID: ${trackId}`);
  };

  return (
    <div>
      <WholeCardContainer>
        {Object.keys(tracks).map((trackId) => {
          const currentTrack = tracks[trackId];
          const creatorInitial = currentTrack.user.username.charAt(0);
          const isFavorite = favoriteStatus[trackId];

          return (
            <CardWrapper key={trackId}>
              <CardContainer>
                <Top>
                  <Favorite>
                    <FavoriteIcon
                      onClick={() =>
                        handleFavoriteClick(trackId, setFavoriteStatus)
                      }
                      style={{ color: isFavorite ? "red" : "white" }}
                    />
                    
                  </Favorite>
                  <CardImage
                    src={currentTrack.cover_photo}
                    alt="audio avatar"
                  />
                  <More>
                    <MoreVertIcon
                      onClick={() => handleDropdownClick(trackId)}
                    />
                    <DropdownContent show={dropdownVisible === trackId}>
                      <DropdownButton onClick={() => handleUpdate(trackId)}>
                        Update
                      </DropdownButton>
                      <DropdownButton onClick={() => handleDelete(trackId)}>
                        Delete
                      </DropdownButton>
                    </DropdownContent>
                  </More>
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
                    <Avatar style={{ height: "30px", width: "30px"  }}>
                      {creatorInitial}
                    </Avatar>
                    <CreaterName>{currentTrack.user.username}</CreaterName>
                  </Creater>
                </CreaterInfo>

                <PlayIcon>
                  <PlayArrowIcon onClick={() => playCurrent(trackId)} />
                </PlayIcon>
              </CardContainer>
            </CardWrapper>
          );
        })}
      </WholeCardContainer>
      {currentSong && (
        <audio
          src={currentSong.audio_file}
          ref={audioRef}
          onTimeUpdate={onPlaying}
        />
      )}
      {currentSong && (
        <MusicPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={trackList}
          setSongs={setTrackList}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
        />
      )}
    </div>
  );
};

export default MusicCard;
