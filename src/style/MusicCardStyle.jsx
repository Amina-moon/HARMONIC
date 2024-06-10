import styled from "styled-components";
import { IconButton } from "@mui/material";

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
  font-weight: 50;
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

  ${"" /* display: flex; */}
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
  color: ${({ theme }) => theme.text_primary} !important;
  bottom: -120px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  dispaly: flex;
  align-items: center;
  position: absolute !important;
  
`;
export const DropdownContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: #f9f9f9;
  position: absolute;
  width: 50px;
  right: -37px; 
  top: -10px; 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 10px;

`;

export const DropdownButton = styled.button`
  color: black;
  padding: 12px 6px;
  text-decoration: none;
  display: block;
  font-size: 11px;
  width: 100%;
  border: none;
  background: none;
  text-align: left;

  &:hover {
    background-color: purple;
    color: white;
    border-radius: 10px;
  }
`;