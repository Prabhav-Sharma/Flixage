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
import { fetchVideos, fetchVideo } from "./videosAPI";

export {
  fetchVideos,
  fetchVideo,
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
