import axios from "axios";
const fetchWatchLater = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/user/watchlater",
      headers: { authorization: token },
    });

    dispatcher({
      type: "UPDATE_WATCH_LATER",
      payload: { watchlater: response.data.watchlater },
    });
  } catch (e) {
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
      type: "UPDATE_WATCH_LATER",
      payload: { watchlater: response.data.watchlater },
    });
  } catch (e) {
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
      type: "UPDATE_WATCH_LATER",
      payload: { watchlater: response.data.watchlater },
    });
  } catch (e) {
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
      type: "UPDATE_WATCH_LATER",
      payload: { watchlater: response.data.watchlater },
    });
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchWatchLater,
  addToWatchLater,
  deleteFromWatchLater,
  removeAllWatchLater,
};
