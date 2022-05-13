import {
  UPDATE_HISTORY_ACTION,
  UPDATE_LIKES_ACTION,
  UPDATE_PLAYLISTS_ACTION,
  UPDATE_PLAYLIST_ACTION,
  UPDATE_WATCH_LATER_ACTION,
} from "../../utils";

const userDataReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_HISTORY_ACTION:
      return { ...state, history: action.payload.history };

    case UPDATE_LIKES_ACTION:
      return { ...state, likes: action.payload.likes };

    case UPDATE_WATCH_LATER_ACTION:
      return { ...state, watchlater: action.payload.watchlater };

    case UPDATE_PLAYLISTS_ACTION:
      return { ...state, playlists: action.payload.playlists };

    case UPDATE_PLAYLIST_ACTION:
      const newPlaylist = action.payload.playlist;
      const newPlaylists = state.playlists.map((playlist) =>
        playlist._id === newPlaylist._id ? newPlaylist : playlist
      );
      return { ...state, playlists: newPlaylists };
    default:
      return state;
  }
};

export { userDataReducer };
