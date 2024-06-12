import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";

const RegisterContainer = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 500px;
  border: 4px solid purple;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 8px;
  text-align: center;
  background: white;
`;

const RegisterHeader = styled.h2`
  text-align: center;
  margin-top: 0;
`;

const Closebutton = styled(IconButton)`
  padding: 6px !important;
  border-radius: 50%;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 1.3em;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.3em;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1.3em;
  cursor: pointer;
`;

const Message = styled.p`
  color: red;
`;

const SuccessMessageContainer = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  border: 2px solid green;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 8px;
  text-align: center;
  background: white;
`;

const SuccessMessage = styled.h2`
  color: green;
`;

function Register({ isVisible, setIsVisible }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/register/", {
        username,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      setMessage("");
      setIsSuccess(true);
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    setIsVisible(false);
  };

  return (
    <RegisterContainer isOpen={isVisible} onRequestClose={handleClose}>
      <LoginContainer>
        <RegisterHeader>Register</RegisterHeader>
        <Closebutton onClick={handleClose}>
          <CloseRoundedIcon />
        </Closebutton>
      </LoginContainer>

      <Form onSubmit={handleRegister}>
        <InputGroup>
          <Label>Username: </Label>
          <Input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>First Name: </Label>
          <Input
            type="text"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Last Name: </Label>
          <Input
            type="text"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Password: </Label>
          <Input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Confirm Password: </Label>
          <Input
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
        <Button type="submit">Register</Button>
      </Form>
      {message && <Message>{message}</Message>}
      {isSuccess && (
        <SuccessMessageContainer
          isOpen={isSuccess}
          onRequestClose={handleSuccessClose}
        >
          <SuccessMessage>Registration Successful</SuccessMessage>
          <Button onClick={handleSuccessClose}>OK</Button>
        </SuccessMessageContainer>
      )}
    </RegisterContainer>
  );
}

export default Register;
