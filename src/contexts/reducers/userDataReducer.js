const userDataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HISTORY":
      return { ...state, history: action.payload.history };

    case "UPDATE_LIKED":
      return { ...state, liked: action.payload.liked };

    case "UPDATE_WATCH_LATER":
      return { ...state, watchlater: action.payload.watchlater };

    case "UPDATE_PLAYLISTS":
      return { ...state, playlists: action.payload.playlists };

    default:
      return state;
  }
};

export { userDataReducer };
