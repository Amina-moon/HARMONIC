import React, { useState } from 'react';
import axiosInstance from '../components/AxiosInstance';

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload Song</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Audio File:</label>
          <input
            type="file"
            name="audio_file"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Artist:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Cover Photo:</label>
          <input
            type="file"
            name="cover_photo"
            onChange={handleFileChange}
            style={styles.fileInput}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Upload</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    overflowY: 'auto',
    maxHeight: '80vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'green',
  },
};

export default Upload;
