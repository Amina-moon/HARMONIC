import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicPlayer from "./MusicPlayer";
import { handleFavoriteClick } from "../utils/handleFavourite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
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

const MusicCard = ({ isLoggedIn, setVisible, user }) => {
  const [trackList, setTrackList] = useState([]);
  const [tracks, setTracks] = useState({});
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [trackToDelete, setTrackToDelete] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

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
    if (isLoggedIn) {
      axiosInstance
        .get("/api/favourite/list/")
        .then((response) => {
          const favouriteTrackData = response.data.reduce((acc, track) => {
            acc[track.id] = track;
            return acc;
          }, {});
          setFavoriteStatus(favouriteTrackData);
        })
        .catch((error) => {
          console.error("Error fetching the data", error);
        });
    }
  }, [isLoggedIn]);

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
      const currentTime = audioRef.current.currentTime;
      setCurrentSong({
        ...currentSong,
        progress: (currentTime / duration) * 100,
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
    navigate(`/update/${trackId}`);
  };

  const handleDelete = () => {
    if (trackToDelete) {
      axiosInstance
        .delete(`http://127.0.0.1:8000/api/song/${trackToDelete}`)
        .then((response) => {
          console.log(`Track with ID ${trackToDelete} deleted successfully`);
          setTracks((prevTracks) => {
            const updatedTracks = { ...prevTracks };
            delete updatedTracks[trackToDelete];
            return updatedTracks;
          });
          setShowDeleteModal(false);
          setTrackToDelete(null);
        })
        .catch((error) => {
          console.error(`Error deleting track with ID ${trackToDelete}`, error);
        });
    }
  };

  const openDeleteModal = (trackId) => {
    setTrackToDelete(trackId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTrackToDelete(null);
  };

  return (
    <div>
      <WholeCardContainer>
        {Object.keys(tracks).map((trackId) => {
          const currentTrack = tracks[trackId];
          const creatorInitial = currentTrack.user.username.charAt(0);
          const isFavorite = favoriteStatus[trackId];
          const isCreator = currentTrack.user.id === user.id;

          return (
            <CardWrapper key={trackId}>
              <CardContainer>
                <Top>
                  <Favorite>
                    <FavoriteIcon
                      onClick={() => {
                        if (!isLoggedIn) {
                          setVisible(true); // Show login form if not logged in
                        } else {
                          handleFavoriteClick(trackId, setFavoriteStatus);
                        }
                      }}
                      style={{ color: isFavorite ? "red" : "white" }}
                    />
                  </Favorite>
                  <CardImage src={currentTrack.cover_photo} alt="audio avatar" />
                  {isCreator && (
                    <More>
                      <MoreVertIcon onClick={() => handleDropdownClick(trackId)} />
                      <DropdownContent show={dropdownVisible === trackId}>
                        <DropdownButton onClick={() => handleUpdate(trackId)}>
                          Update
                        </DropdownButton>
                        <DropdownButton onClick={() => openDeleteModal(trackId)}>
                          Delete
                        </DropdownButton>
                      </DropdownContent>
                    </More>
                  )}
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
                    <Avatar style={{ height: "30px", width: "30px" }}>
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
        <audio src={currentSong.audio_file} ref={audioRef} onTimeUpdate={onPlaying} />
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

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this track?</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeDeleteModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default MusicCard;
