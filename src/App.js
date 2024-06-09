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
import Update from './pages/Update';
import Displaymusic from "./pages/Displaymusic.jsx";


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
  const [user, setUser] = useState({});
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
              setUser={setUser}
            />
            <Routes>
              <Route path="/" exact 
                element={<Dashboard 
                          isLoggedIn={isLoggedIn} 
                          setVisible={setVisible}
                          user={user}
 />} />
              <Route path="/favourites" exact element={<Favourite />} />
              <Route path="/search" exact element={<Search />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/upload" exact element={<Upload/>}/>
              <Route path="/showmusic/:type" exact element={<Displaymusic />} />
              <Route path="/update/:id" element={<Update />} />
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
