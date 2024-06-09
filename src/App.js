import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Favourite from "./pages/Favourite.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Upload  from "./pages/Upload";
import Displaymusic from "./pages/Displaymusic.jsx";
import MusicPlayer from "./components/MusicPlayer";


const Container = styled.div`
  background: ${({ theme }) => theme.bgLight};
  display: flex;
  width: 100%;
  
 
`;
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
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
              // visible={visible}
              // setVisible={setVisible}
              isLoggedIn={isLoggedIn}
              // setLoggedIn={setLoggedIn}
            />
          )}
         
          <Frame>
            <NavBar
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              visible={visible}
              setVisible={setVisible}
              isLoggedIn={isLoggedIn}
              setLoggedIn={setLoggedIn}
            />
            <Routes>
              <Route path="/" exact element={<Dashboard isLoggedIn={isLoggedIn} />} />
              <Route path="/favourites" exact element={<Favourite />} />
              <Route path="/search" exact element={<Search />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/upload" exact element={<Upload/>}/>
              <Route path="/showmusic/:type" exact element={<Displaymusic />} />
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
