import axiosInstance from "../components/AxiosInstance";

export const handleFavoriteClick = async (trackId, setFavoriteStatus) => {
  try {
    const response = await axiosInstance.post('/api/favourite/update/', {
      song: trackId,
    });

    if (response.status == 200) {
        // Update favorite status
        setFavoriteStatus(prevStatus => ({
            ...prevStatus,
            [trackId]: response.data.is_favourite,
            }));
    } else {
      console.error('Failed to update favorite status');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


export const removeFavourite = async (trackId, setTracks, setTrackList, setCurrentSong, currentSong) => {
    try {
      const response = await axiosInstance.post('/api/favourite/update/', {
        song: trackId,
      });
  
      if (response.status == 200) {
        // Update the tracks state to remove the unfavorited track
        const favourite_list = response.data.favourite_list;
        setTracks(prevTracks => {
            const newTracks = { ...prevTracks };
            delete newTracks[trackId];
            return newTracks;
        });
        setTrackList(favourite_list);

        // Update the current song if it is the same as the track being unfavorited
        if (currentSong.id === trackId) {
            if (favourite_list.length > 0) {
                setCurrentSong(favourite_list[0]);
            } else {
                setCurrentSong(null);
            }
        }
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  