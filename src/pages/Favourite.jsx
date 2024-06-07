// import { Container } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MusicPlayer from "../components/MusicPlayer";
import axiosInstance from "../components/AxiosInstance";
import { handleFavoriteClick } from "../utils/handleFavourite";
import {
  Container,
  WholeCardContainer,
  Topic,
  CardWrapper,
  CardContainer,
  Top,
  Favorite,
  CardImage,
  CardTitle,
  CardContent,
  SpecialCardContent,
  CreaterInfo,
  Creater,
  PlayIcon,
  CreaterName,
} from "../style/FavouriteStyle";
const Favourite = () => {
  const [trackList, setTrackList] = useState([]);
  const [tracks, setTracks] = useState({});
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get("/api/favourite/list/")
      .then((response) => {
        const trackData = response.data.reduce((acc, track) => {
          acc[track.id] = track;
          return acc;
        }, {});
        setTracks(trackData);
        setTrackList(response.data);
        setFavoriteStatus(new Array(response.data.length).fill(false));
        setCurrentSong(response.data[0]); // Set the initial song if available
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
  return (
    <Container>
      <Topic>Favorites</Topic>
      <div>
        <WholeCardContainer>
          {Object.keys(tracks).map((trackId) => {
            const currentTrack = tracks[trackId];
            const creatorInitial = currentTrack.user.username.charAt(0);
            const isFavorite = favoriteStatus[trackId];

            // console.log(currentSong);
            return (
              <CardWrapper key={trackId}>
                <CardContainer>
                  <Top>
                    <Favorite>
                      <FavoriteIcon
                        onClick={() =>
                          handleFavoriteClick(trackId, setFavoriteStatus)
                        }
                       
                        style={{ color: "red" }}
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
            setSongs={setTracks}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
          />
        )}
      </div>
    </Container>
  );
};

export default Favourite;
