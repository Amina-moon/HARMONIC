import axiosInstance from "../components/AxiosInstance";

export const handleFavoriteClick = async (trackId, setFavoriteStatus) => {
    try {
      const response = await axiosInstance.post('/api/favourite/update/', {
        song: trackId,
      });
  
      if (response.status === 200) {
        const result = response.data;
        setFavoriteStatus(result.favourite_list);
    } else {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  