const userDataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_HISTORY":
      return { ...state, history: action.payload.history };

    case "UPDATE_LIKES":
      return { ...state, likes: action.payload.likes };

    case "UPDATE_WATCH_LATER":
      return { ...state, watchlater: action.payload.watchlater };

    case "UPDATE_PLAYLISTS":
      return { ...state, playlists: action.payload.playlists };

    default:
      return state;
  }
};

export { userDataReducer };
