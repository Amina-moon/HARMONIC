import React, { useState, useEffect } from 'react';
import axios from "axios";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import styled from 'styled-components';
import { IconButton } from "@mui/material";
import axiosInstance from '../components/AxiosInstance';
import MusicCard from '../components/MusicCard';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px;
  margin-left: 20px; 
`;

const SearchIcon = styled(IconButton)`
  color: white !important;
  padding: 6px !important;
  margin-right: 5px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 7px;
  background-color: ${({ theme }) => theme.bg};
  color: white;
  cursor: text;

  ::placeholder {
    color: white;
  }
`;

const SearchContainer = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 760px){
    padding: 6px 10px;
  }
`;

const Search = ({ isLoggedIn, setVisible, user }) => {
  const [query, setQuery] = useState("");
  const [trackList, setTrackList] = useState([]);
  const [tracks, setTracks] = useState({});
  const [favoriteStatus, setFavoriteStatus] = useState({});


  useEffect(() => {
    if (isLoggedIn) {
      axiosInstance.get('/api/favourite/list/')
        .then(response => {
          const favouriteTrackData = response.data.reduce((acc, track) => {
            acc[track.id] = track;
            return acc;
          }, {});
          setFavoriteStatus(favouriteTrackData);
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    }
  }, [isLoggedIn]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/song/search/?q=${query}`);
      const trackData = response.data.reduce((acc, track) => {
        acc[track.id] = track;
        return acc;
      }, {});
      setTracks(trackData);
      setTrackList(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <SearchContainer>
      <SearchBarContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon onClick={handleSearch}>
          <SearchRoundedIcon />
        </SearchIcon>
      </SearchBarContainer>
      <MusicCard
        isLoggedIn={isLoggedIn}
        setVisible={setVisible}
        user={user}
        tracks={tracks}
        setTracks={setTracks}
        trackList={trackList}
        setTrackList={setTrackList}
        favoriteStatus={favoriteStatus}
        setFavoriteStatus={setFavoriteStatus}
      />

    </SearchContainer>
  );
};

export default Search;