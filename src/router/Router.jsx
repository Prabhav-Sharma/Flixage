import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Videos,
  History,
  Login,
  SignUp,
  Playlist,
  Playlists,
  WatchLater,
  Video,
  Liked,
  NotFound,
} from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:videoId" element={<Video />} />
      <Route path="/history" element={<History />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlist/:playlistID" element={<Playlist />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
