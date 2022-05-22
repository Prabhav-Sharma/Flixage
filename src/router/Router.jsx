import { Route, Routes } from "react-router-dom";
import {
  Home,
  Videos,
  History,
  Login,
  SignUp,
  Playlists,
  WatchLater,
  Video,
  Liked,
  NotFound,
} from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
import MockAPI from "../pages/MockAPI";

function Router() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/history" element={<History />} />
        <Route path="/likes" element={<Liked />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/playlists" element={<Playlists />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/mockman" element={<MockAPI />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:videoId" element={<Video />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Router;
