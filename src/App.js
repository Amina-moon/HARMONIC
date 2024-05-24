import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';
import Favourite from './pages/Favourite.jsx';
import Profile from './pages/Profile.jsx';
import Search from './pages/Search.jsx';
import Displaymusic from './pages/Displaymusic.jsx';
import MusicPlayer from "./components/MusicPlayer";

const Container = styled.div`
  background: ${({ theme }) => theme.bgLight};
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
        {menuOpen && (
          <Sidebar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
          />
          )}
          <Frame>
            <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
             <Routes>
             <Route path="/" exact element = {<Dashboard/>}/>
             <Route path="/favourites" exact element = {<Favourite/>}/>
             <Route path="/search" exact element = {<Search/>}/>
             <Route path="/profile" exact element = {<Profile/>}/>
             
             <Route path="/showmusic/:type" exact element = {<Displaymusic/>}/>

             </Routes>
             </Frame>
            
        </Container>
       
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
