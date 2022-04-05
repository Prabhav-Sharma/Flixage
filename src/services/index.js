import axios from "axios";
import { login, signup } from "./authAPI";
import {
  fetchHistory,
  addToHistory,
  deleteFromHistory,
  clearAllHistory,
} from "./historyAPI";

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
};
