import axios from "axios";
import { login, signup } from "./authAPI";
import {
  fetchHistory,
  addToHistory,
  deleteFromHistory,
  clearAllHistory,
} from "./historyAPI";

import {
  fetchWatchLater,
  addToWatchLater,
  deleteFromWatchLater,
  removeAllWatchLater,
} from "./watchLaterAPI";

import {
  fetchLikes,
  addToLikes,
  deleteFromLikes,
  clearAllLikes,
} from "./likesAPI";

import {
  fetchAllPlaylists,
  addPlaylist,
  removePlaylist,
  fetchPlaylist,
  addToPlaylist,
  removeFromPlaylist,
} from "./playlistsAPI";

const fetchVideos = async (setterFunc) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/videos",
    });
    setterFunc(response.data.videos);
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchVideos,
  login,
  signup,
  fetchHistory,
  addToHistory,
  deleteFromHistory,
  clearAllHistory,
  fetchWatchLater,
  addToWatchLater,
  deleteFromWatchLater,
  fetchLikes,
  addToLikes,
  deleteFromLikes,
  clearAllLikes,
  removeAllWatchLater,
  fetchAllPlaylists,
  addPlaylist,
  removePlaylist,
  fetchPlaylist,
  addToPlaylist,
  removeFromPlaylist,
};
