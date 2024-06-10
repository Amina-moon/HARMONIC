import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import MusicCard from '../components/MusicCard';
import axiosInstance from '../components/AxiosInstance';

export const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 760px) {
    padding: 6px 10px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.bg};
`;

export const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 760px) {
    font-size: 18px;
  }
`;

const Dashboard = ({ isLoggedIn, setVisible, user }) => {
  const [trackList, setTrackList] = useState([]);
  const [tracks, setTracks] = useState({});
  const [favoriteStatus, setFavoriteStatus] = useState({});

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
          console.error("Error fetching favorites:", error);
        });
    }
  }, [isLoggedIn]);

  return (
    <DashboardMain>
      <Topic>ANASHID</Topic>
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
    </DashboardMain>
  );
};

export default Dashboard;