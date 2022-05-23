import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import NewsPage from "./views/NewsPage/NewsPage";
import UploadPage from "./views/UploadPage/UploadPage";
import GamesPage from "./views/GamesPage/GamesPage";
import MyprofilePage from "./views/Myprofile/MyprofilePage";
import PostDetailPage from "./views/PostDetailPage/PostDetailPage";
import UserProfile from "./views/UserProfile/UserProfile";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";
import FooterPage from "./views/Footer/FooterPage";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import FavoritesPage from "./views/FavoritesPage/FavoritesPage";
import Minesweeper from "./views/GamesPage/sections/MineSweeper/Minesweeper";
import TicTacToe from "./views/GamesPage/sections/TTT/TicTacToe";
import WordRelay from "./views/GamesPage/sections/WordRelay/WordRelay";
import Baseball from "./views/GamesPage/sections/BaseBall/Baseball";
import Reaction from "./views/GamesPage/sections/Reaction/Reaction";
import CardFlip from "./views/GamesPage/sections/CardFlip/CardFlip";
import RPS from "./views/GamesPage/sections/RPS/RPS";
import Lotto from "./views/GamesPage/sections/Lotto/Lotto";
import Game2048 from "./views/GamesPage/sections/Game2048/Game2048";
import Mole from "./views/GamesPage/sections/Mole/Mole";

function App() {
  return (
    <Router>
      <NavBar />
      <div
        style={{
          paddingTop: "90px",
          minHeight: "calc(100vh - 80px)",
          backgroundColor: "#E7EAD9",
        }}
      >
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)} />
          <Route path="/news" element={Auth(NewsPage, null)} />
          <Route path="/subscription" element={Auth(SubscriptionPage, true)} />
          <Route
            path="/news/post/:postId"
            element={Auth(PostDetailPage, null)}
          />
          <Route path="/news/user/:userId" element={Auth(UserProfile, null)} />
          <Route path="/games" element={Auth(GamesPage, null)} />
          <Route path="/minesweeper" element={Auth(Minesweeper, null)} />
          <Route path="/tictactoe" element={Auth(TicTacToe, null)} />
          <Route path="/wordrelay" element={Auth(WordRelay, null)} />
          <Route path="/baseball" element={Auth(Baseball, null)} />
          <Route path="/reactiontest" element={Auth(Reaction, null)} />
          <Route path="/cardflip" element={Auth(CardFlip, null)} />
          <Route path="/rsp" element={Auth(RPS, null)} />
          <Route path="/lotto" element={Auth(Lotto, null)} />
          <Route path="/2048" element={Auth(Game2048, null)} />
          <Route path="/mole" element={Auth(Mole, null)} />
          <Route path="/register" element={Auth(RegisterPage, false)} />
          <Route path="/login" element={Auth(LoginPage, false)} />
          <Route path="/videouploads" element={Auth(VideoUploadPage, true)} />
          <Route path="/uploads" element={Auth(UploadPage, true)} />
          <Route path="/profile" element={Auth(ProfilePage, true)} />
          <Route path="/myprofile" element={Auth(MyprofilePage, true)} />
          <Route path="/favorites" element={Auth(FavoritesPage, true)} />
        </Routes>
      </div>
      <FooterPage />
    </Router>
  );
}

export default App;
