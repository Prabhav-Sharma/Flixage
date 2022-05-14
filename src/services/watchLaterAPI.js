import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_WATCH_LATER_ACTION } from "../utils";

const fetchWatchLater = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/user/watchlater",
      headers: { authorization: token },
    });

    dispatcher({
      type: UPDATE_WATCH_LATER_ACTION,
      payload: { watchlater: response.data.watchlater },
    });
  } catch (e) {
    toast.error("Can't get the data, you can watch them later xD");
    console.log(e);
  }
};

const addToWatchLater = async (requestData, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/watchlater",
      headers: { authorization: token },
      data: requestData,
    });
    dispatcher({
      type: UPDATE_WATCH_LATER_ACTION,
      payload: { watchlater: response.data.watchlater },
    });
    toast.success("Say you'll remember me?");
  } catch (e) {
    toast.error("Can't add to watch later 😔, watch now?");
    console.log(e);
  }
};

const deleteFromWatchLater = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/watchlater/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_WATCH_LATER_ACTION,
      payload: { watchlater: response.data.watchlater },
    });
    toast.success("Phew! There goes one off the list!");
  } catch (e) {
    toast.error("Uh oh, something broke down 😔");
    console.log(e);
  }
};

const removeAllWatchLater = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: "/api/user/watchlater/all",
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_WATCH_LATER_ACTION,
      payload: { watchlater: response.data.watchlater },
    });
    toast.success("New list, who this? 😊");
  } catch (e) {
    toast.error("Uh oh, something broke down 😔");
    console.log(e);
  }
};

export {
  fetchWatchLater,
  addToWatchLater,
  deleteFromWatchLater,
  removeAllWatchLater,
};
