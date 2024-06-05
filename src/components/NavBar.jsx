import React ,{useState} from 'react'
import styled  from 'styled-components';
import { Menu, Person2Rounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Login from './Login';

const NavBarDiv = styled.div`
display:flex;
justify-content:space-between;

padding:16px 40px;
align-items:center;
color:${({theme})=>theme.text_primary};

gap:30px;
background:${({theme})=> theme.bg_Light};
backdrop-filter:blur(5.7px);
-webkit-backdrop-filter:blur(5.7px);
@media (max-width:760px){
    padding:16px;
}
`;
const ButtonDiv = styled.div`
display:flex;
gap:8px;
font-size:14px;
cursor:pointer;
text-decoration:none;
max-width:70px;
align-items:center;
color:${({theme})=> theme.primary};
border:1px solid ${({theme})=> theme.bg_primary};
border-radius:6px;
padding:8px 10px;

`;
const MenuButton = styled(IconButton)`
color:${({theme})=> theme.text_secondary} !important;

`;

function NavBar({ menuOpen,setMenuOpen,onLoginClick}) {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };
  
  
  return (
<>
      <NavBarDiv>
      <MenuButton onClick={()=>setMenuOpen(!menuOpen)}>
        <Menu/>
        </MenuButton>

        <ButtonDiv onClick={handleLoginClick} >
          
            <Person2Rounded  />
            Login
          
        </ButtonDiv>
      </NavBarDiv>
      {loginOpen && <Login onClose={closeLogin} />}
    </>
  )
}

export default NavBar