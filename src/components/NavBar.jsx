import React, { useState } from "react";
import styled from "styled-components";
import { Menu, Person2Rounded, LoginRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "react-modal";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Register from "./Register"; // Import the Register component

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg_Light};
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
  @media (max-width: 760px) {
    padding: 16px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  max-width: 70px;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.bg_primary};
  border-radius: 6px;
  padding: 8px 10px;
`;
const MenuButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;
export const PopupContainer = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 4px solid purple;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 8px;
  text-align: center;
  background: white;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoginHeader = styled.h2`
  text-align: center;
  margin-top: 0;
`;

export const Closebutton = styled(IconButton)`
  padding: 6px !important;
  border-radius: 50%;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export const InputGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 1.3em;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1.3em;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 1.3em;
  cursor: pointer;
`;

export const Message = styled.p`
  color: red;
`;

export const RegisterLink = styled.a`
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
`;

function NavBar({ menuOpen, setMenuOpen, visible, setVisible, isLoggedIn, setLoggedIn, setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegisterVisible, setIsRegisterVisible] = useState(false); // Define state

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      const userResponse = await axios.get("http://127.0.0.1:8000/api/user/me/", {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      setUser(userResponse.data);
      setLoggedIn(true);

    } catch (error) {
      setMessage("Invalid credentials");
      setUsername("");
      setPassword("");
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Update state to reflect that the user is logged out
    setLoggedIn(false);
    setVisible(false);
    setUser(null);
  };

  const handleOpenRegister = () => {
    setVisible(false);
    setIsRegisterVisible(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterVisible(false);
    setVisible(true);
  };

  return (
    <>
      <NavBarDiv>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <Menu />
        </MenuButton>
        {isLoggedIn ? (
        <ButtonDiv onClick={handleLogout}>
          <Person2Rounded />
          Logout
        </ButtonDiv>
      ) : (
        <ButtonDiv onClick={() => setVisible(true)}>
          <LoginRounded />
          Login
        </ButtonDiv>
      )}
     
      {visible && !isLoggedIn && (
        <PopupContainer
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
        >
          <LoginContainer>
            <LoginHeader>Login</LoginHeader>
            <Closebutton onClick={handleClose}>
              <CloseRoundedIcon />
            </Closebutton>
          </LoginContainer>

          <Form onSubmit={handleLogin}>
            <InputGroup>
              <Label>Username: </Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Password: </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button type="submit">Login</Button>
          </Form>
          {message && <Message>{message}</Message>}
          <RegisterLink onClick={handleOpenRegister}>
            Don't have an account? Register
          </RegisterLink>
        </PopupContainer>
      )}
      {isRegisterVisible && (
        <Register isVisible={isRegisterVisible} setIsVisible={handleRegisterClose} />
      )}
      </NavBarDiv>
     
    </>
  );
}

export default NavBar;
