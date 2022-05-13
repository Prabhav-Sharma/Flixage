import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_PLAYLIST_ACTION, UPDATE_PLAYLISTS_ACTION } from "../utils";
//calls for operations on playlists
const fetchAllPlaylists = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/user/playlists",
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_PLAYLISTS_ACTION,
      payload: { playlists: response.data.playlists },
    });
  } catch (e) {
    console.log(e);
  }
};

const addPlaylist = async (requestData, token, dispatcher) => {
  //request data must be in this format { playlist: {title: "foo", description:"bar bar bar" }
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/playlists",
      headers: { authorization: token },
      data: { playlist: requestData },
    });
    dispatcher({
      type: UPDATE_PLAYLISTS_ACTION,
      payload: { playlists: response.data.playlists },
    });
    toast.success("Playlist Added!");
  } catch (e) {
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};

const removePlaylist = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/playlists/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_PLAYLISTS_ACTION,
      payload: { playlists: response.data.playlists },
    });
    toast.success("Playlist Removed!");
  } catch (e) {
    console.log(e);
  }
};

//Calls for operations on an individual playlist

//@params: playlistId=> playlist ID , token=> authorization token,
//  dispatcher=> set function for playlist state
const fetchPlaylist = async (playlistId, token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/user/playlists/${playlistId}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_PLAYLIST_ACTION,
      payload: { playlist: response.data.playlist },
    });
  } catch (e) {
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};

//@params: playlistId=> playlist ID , requestData=> in the format of {video:{videoObj}},
// token=> authorization token,  dispatcher=> set function for playlist state
const addToPlaylist = async (playlistId, requestData, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: `/api/user/playlists/${playlistId}`,
      headers: { authorization: token },
      data: requestData,
    });
    dispatcher({
      type: UPDATE_PLAYLIST_ACTION,
      payload: { playlist: response.data.playlist },
    });
    toast.success("Video added to playlist!");
  } catch (e) {
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};

//@params: playlistId=> playlist ID , requestData=> in the format of {video:{videoObj}},
// videoId=> id of video to be delete,token=> authorization token,  dispatcher=> set function for playlist state
const removeFromPlaylist = async (playlistId, videoId, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/playlists/${playlistId}/${videoId}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_PLAYLIST_ACTION,
      payload: { playlist: response.data.playlist },
    });
    toast.success("Video removed from playlist!");
  } catch (e) {
    console.log(e);
    toast.error("Uh oh, something broke 🥺");
  }
};

export {
  fetchAllPlaylists,
  addPlaylist,
  removePlaylist,
  fetchPlaylist,
  addToPlaylist,
  removeFromPlaylist,
};
