import axios from "axios";
import { login, signup } from "./authCalls";

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

export { fetchVideos, login, signup };
