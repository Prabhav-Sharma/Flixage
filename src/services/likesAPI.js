import axios from "axios";
import { toast } from "react-toastify";

const fetchLikes = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/user/likes",
      headers: { authorization: token },
    });

    dispatcher({
      type: "UPDATE_LIKES",
      payload: { likes: response.data.likes },
    });
  } catch (e) {
    console.log(e);
    toast.error("Can't fetch likes, try again later!");
  }
};

const addToLikes = async (requestData, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/likes",
      headers: { authorization: token },
      data: requestData,
    });
    dispatcher({
      type: "UPDATE_LIKES",
      payload: { likes: response.data.likes },
    });
    toast.success("Video added to your liked videos");
  } catch (e) {
    console.log(e);
    toast.error("Seems like our server is not having a good time'");
  }
};

const deleteFromLikes = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/likes/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_LIKES",
      payload: { likes: response.data.likes },
    });
    toast.success("You'll find new videos to like!");
  } catch (e) {
    toast.error("Apparently, our server likes this video too much");
    console.log(e);
  }
};

const clearAllLikes = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: "/api/user/likes/all",
      headers: { authorization: token },
    });
    dispatcher({
      type: "UPDATE_LIKES",
      payload: { likes: response.data.likes },
    });
    toast.success("New day, new likes?");
  } catch (e) {
    console.log(e);
    toast.error("Sorry, server said no! maybe later.");
  }
};

export { fetchLikes, addToLikes, deleteFromLikes, clearAllLikes };
