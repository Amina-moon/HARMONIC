import React, { useState } from 'react';
import axiosInstance from '../components/AxiosInstance';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow-y: auto;
  max-height: 80vh;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Button = styled.button`
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

const Message = styled.p`
  text-align: center;
  margin-top: 20px;
  color: green;
`;

const Upload = () => {
  const [title, setTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'audio_file') {
      setAudioFile(files[0]);
    } else if (name === 'cover_photo') {
      setCoverPhoto(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('audio_file', audioFile);
    formData.append('artist', artist);
    formData.append('duration', duration);
    formData.append('cover_photo', coverPhoto);

    try {
      const response = await axiosInstance.post('/api/song/', formData);

      if (response.status === 201) {
        setMessage('Song uploaded successfully!');
      } else {
        setMessage('Failed to upload song.');
      }
    } catch (error) {
      console.error('Error uploading song:', error);
      setMessage('An error occurred while uploading the song.');
    }
  };

  return (
    <Container>
    <Heading>Upload Song</Heading>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title:</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Audio File:</Label>
        <FileInput
          type="file"
          name="audio_file"
          onChange={handleFileChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Artist:</Label>
        <Input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Duration:</Label>
        <Input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Cover Photo:</Label>
        <FileInput
          type="file"
          name="cover_photo"
          onChange={handleFileChange}
          required
        />
      </FormGroup>
      <Button type="submit">Upload</Button>
    </Form>
    {message && <Message>{message}</Message>}
  </Container>
  );
};


export default Upload;
