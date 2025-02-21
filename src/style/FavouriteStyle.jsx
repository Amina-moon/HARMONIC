import styled from  'styled-components';
import { IconButton } from "@mui/material";

export const Container=styled.div`
padding:20px 30px;
padding-bottom:200px;
height:100%;

dosplay:flex;
gap:20px;
@media (max-width:760px){
  padding:6px 10px;
 
}
`;

export const Topic=styled.div`
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
export const FavoriteContainer=styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
gap:14px;
padding:18px 6px;
@media (max-width:550px){
  justify-content:center;
}
`;

export const WholeCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 18px 6px;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export const CardContainer = styled.div`
  max-width: 200px;
  height: 260px;
  padding: 16px;
  background: ${({ theme }) => theme.bgLight};
  border-radius: 6px;
  margin-left: 2px;
  margin-bottom: 20px;
  border: 2px solid #a9a9a9;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.04s ease-in-out;
    filter: brightness(1.3);
  }
`;

export const CardWrapper = styled.div`
  margin: 10px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  margin-top: -20px;
  margin-bottom: 10px;
  margin-left: -15px;
  text-align: start;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const CardContent = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  margin-top: -40px;
  margin-left: -15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SpecialCardContent = styled(CardContent)`
  font-weight: 500;
  margin-bottom: 0px;
`;

export const CardImage = styled.img`
  width: 220px;
  height: 150px;
  margin-top: -10px;
  border: 1px solid ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  max-width: 250px;
`;

export const Favorite = styled(IconButton)`
  color: white !important;
  top: 1px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary} !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
`;

export const CreaterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 1px;
  margin-left: -120px;
`;

export const Creater = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CreaterName = styled.div`
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

export const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #9000ff !important;
  color: white !important;
  backdrop-filter: blur(4px);
  position: absolute !important;
  top: 45%;
  right: 10%;
  display: none;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 16px 4px #9000ff50 !important;
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
  ${CardContainer}:hover & {
    display: flex;
  }
`;
export const More = styled(IconButton)`
  color: white !important;
  bottom: -120px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  dispaly: flex;
  align-items: center;
  position: absolute !important;

`;
export const DropdownButton = styled.button`
  border: none;
 margin-left:200px;
 margin-top:-10px;
 background-color:transparent;
 width:10px;
 height:10px;
 svg {
 font-size: 20px; /* Adjust the size here */
}
`;

export const DropdownContent = styled.div`
 display: ${props => (props.show ? 'block' : 'none')};
 background-color: #f9f9f9;
 position:absolute;
 width: 120px;
 float:right;
 border-radius:4px;
`;

export const DropdownLink = styled.a`
 color: black;
 padding: 12px 16px;
 text-decoration: none;
 display: block;
 font-size:14px;

 &:hover {
   background-color: purple;
 }
`;
