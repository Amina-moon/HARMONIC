import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../components/AxiosInstance';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow-y: auto;
  max-height: 80vh;
`;

export const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Message = styled.p`
  text-align: center;
  margin-top: 20px;
  color: green;
`;

const Update = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/api/song/${id}/`)
      .then(response => {
        const { title, artist, duration } = response.data;
        setTitle(title);
        setArtist(artist);
        setDuration(duration);
      })
      .catch(error => {
        console.error('Error fetching song data:', error);
      });
  }, [id]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'audio_file') {
      const file = files[0];
      setAudioFile(file);

      if (file) {
        const audio = new Audio();
        audio.src = URL.createObjectURL(file);

        audio.onloadedmetadata = () => {
          const durationInSeconds = audio.duration;
          const formattedDuration = formatDuration(durationInSeconds);
          setDuration(formattedDuration);
        };
      }
    } else if (name === 'cover_photo') {
      setCoverPhoto(files[0]);
    }
  };

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (audioFile) formData.append('audio_file', audioFile);
    if (artist) formData.append('artist', artist);
    if (duration) formData.append('duration', duration);
    if (coverPhoto) formData.append('cover_photo', coverPhoto);

    try {
      const response = await axiosInstance.patch(`/api/song/${id}/`, formData);

      if (response.status === 200) {
        navigate('/'); // Redirect to dashboard after successful update
      } else {
        setMessage('Failed to update song.');
      }
    } catch (error) {
      console.error('Error updating song:', error);
      setMessage('An error occurred while updating the song.');
    }
  };

  return (
    <Container>
      <Heading>Update Song</Heading>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Audio File:</Label>
          <FileInput
            type="file"
            name="audio_file"
            accept="audio/*"
            onChange={handleFileChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Artist:</Label>
          <Input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Duration:</Label>
          <Input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Cover Photo:</Label>
          <FileInput
            type="file"
            name="cover_photo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FormGroup>
        <Button type="submit">Update</Button>
      </Form>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Update;
