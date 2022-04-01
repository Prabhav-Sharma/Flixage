import axios from "axios";

const fetchVideos = async (setterFunc) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/videos",
    });
    setterFunc(response.data.videos);
  } catch (e) {
    console.log("arreeeeeee", e);
  }
};

export { fetchVideos };
