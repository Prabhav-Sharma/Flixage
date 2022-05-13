import axios from "axios";
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

const fetchVideo = async (videoId, setterFunc) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/video/${videoId}`,
    });
    setterFunc(response.data.video);
  } catch (e) {
    console.log(e);
  }
};

export { fetchVideos, fetchVideo };
