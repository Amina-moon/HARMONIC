import React,{useState} from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import styled from 'styled-components';
import { IconButton } from "@mui/material";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  max-width:90%;
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
padding: 7px; /* add padding to the input field */
background-color: ${({ theme }) => theme.bg};
color: white;
cursor: text;

::placeholder {
  color: white;
}
`;

const Search = () => {
  

  return (
    <SearchBarContainer>
    
    <SearchInput
      type="text"
      placeholder="Search"
      
     
    />
    <SearchIcon><SearchRoundedIcon  /></SearchIcon>
    
  </SearchBarContainer>
  )
}

export default Search