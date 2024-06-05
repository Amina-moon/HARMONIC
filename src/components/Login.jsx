import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IconButton } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  
  padding: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  borderRadius: 8px;
  textAlign: center;
  background:#1C1E27;
`;

export const Closebutton =  styled(IconButton)`
  color: white !important;
  top: 1px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
 
  position: absolute !important;
  backdrop-filter: blur(4px);
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false); // Track login state

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setMessage('Logged in successfully');
            setLoggedIn(true); // Set the login state to true
        } catch (error) {
            setMessage('Invalid credentials');
            setUsername(''); // Clear the username input field
            setPassword(''); // Clear the password input field
        }
      };
      const handleClose = () => {
        setLoggedIn(true); // Close the login popup by setting the login state to true
    };
      if (isLoggedIn) {
        return null; // 
      }
    return (
        <PopupContainer>
        
            <h2>Login</h2>
            <Closebutton onClick={handleClose}>
                <CloseRoundedIcon />
            </Closebutton>
            <form onSubmit={handleLogin} style={styles.form}>
            
            
                <div style={styles.inputGroup}>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
    
        </PopupContainer>
    );
};

const styles = {
   
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '1em',
    },
    button: {
        padding: '10px',
        fontSize: '1em',
        cursor: 'pointer',
    },
    message: {
        color: 'red',
    },
};

export default Login;


