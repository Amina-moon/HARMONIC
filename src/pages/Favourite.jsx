// import { Container } from "@mui/material";
import React from "react";
import styled from  'styled-components';
const Container=styled.div`
padding:20px 30px;
padding-bottom:200px;
height:100%;
overflow-y:scroll;
dosplay:flex;
gap:20px;
`;
const Topic=styled.div`
color:${({ theme }) => theme.text_primary};
margin-bottom:8px;
font-size:24px;
font-weight:900;
display:flex;
justify-content:space-between;
align-items:center;
@media (max-width:760px){
  font-size:18px;
}
`;
const FavoriteContainer=styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
gap:14px;
padding:18px 6px;
@media (max-width:550px){
  justify-content:center;
}
`;


const Favourite = () => {
  return (
    <Container>
      <Topic>Favorites</Topic>
      <FavoriteContainer>
        gggggggggggggggggggggggggggggggggggggggg
        jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
      </FavoriteContainer>
    </Container>
  );
};

export default Favourite;
