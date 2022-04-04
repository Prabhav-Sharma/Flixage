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

import GuestRoute from "./GuestRoute";
import ProtectedRoutes from "./ProtectedRoutes";
import MockAPI from "../pages/MockAPI";

function Router() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/history" element={<History />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/playlist/:playlistID" element={<Playlist />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/mockman" element={<MockAPI />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:videoId" element={<Video />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
