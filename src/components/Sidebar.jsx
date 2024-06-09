import React from "react";
import { styled } from "styled-components";
import {
  HomeRounded,
  CloseRounded,
  SearchRounded,
  FavoriteRounded,
  UploadRounded,
  LightModeRounded,
  LogoutRounded,
  LoginRounded,
  DarkModeRounded,
} from "@mui/icons-material";
import logo from "../images/Logo.png";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
    @media(max-width:1100px){
    position:fixed;
    z-index:1000;
    width:100%;
    max-width:250px;
    left:${({menuOpen})=>(menuOpen?'0' :'-100%')};
    transition:0.3s ease-in-out;
} 
    };
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
 
  padding:0px 14px
`;
const Logo = styled.div`

  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: bold;
  font-size: 20px;
  margin: 16px 0px;
`;
const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;
const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary};
    
    }
`;

const NavText = styled.div`
  padding: 12px 0px;
  
`;
const Image = styled.img`
  height: 80px;
`;
const HR = styled.div`
wisth:100%;
height:3px;
background-color:${({ theme }) => theme.text_primary};
margin:10px 0px;

`;

const Sidebar = ({menuOpen,setMenuOpen,setDarkMode,darkMode,isLoggedIn}) => {
  
  const menuItems = [
    {
      link: "/",
      name: "DashBoard",
      icon: <HomeRounded />,
    },
    {
      link: "/search",
      name: "Search",
      icon: <SearchRounded />,
    },
    // {
    //   link: "/favourites",
    //   name: "Favourites",
    //   icon: <FavoriteRounded />,
    // },
    // {
    //   link: "/upload",
    //   name: "Upload",
    //   icon: <UploadRounded />,
    // },
  ];

  if (isLoggedIn) {
    menuItems.push({
      link: "/favourites",
      name: "Favourites",
      icon: <FavoriteRounded />,
    });

    menuItems.push(    {
      link: "/upload",
      name: "Upload",
      icon: <UploadRounded />,
    });
  }

  const button = [
    {
      function: () => setDarkMode(!darkMode),
      name: darkMode?"Light Mode":"Dark Mode",
      icon: darkMode?<LightModeRounded />:<DarkModeRounded/>,
    },
];


  return (
    <MainContainer menuOpen={menuOpen}>
      <Flex>
        <Logo>
          <Image src={logo} />
          HARMONICA
        </Logo>
        <Close onClick={()=>setMenuOpen(false)}>
          <CloseRounded />
        </Close>
      </Flex>
      {menuItems.map((item) => (
        <Link to={item.link} style={{textDecoration:'none'}}>
          <Elements>
            {item.icon}
            <NavText>{item.name}</NavText>
          </Elements>
        </Link>
      ))}
      <HR/>
      {button.map((item) => (
          <Elements onClick={item.function}>
            {item.icon}
            <NavText>{item.name}</NavText>
          </Elements>
        
      ))}
    </MainContainer>
  );
};

export default Sidebar;
