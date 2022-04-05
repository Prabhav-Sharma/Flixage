import axios from "axios";

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
  } catch (e) {
    console.log(e);
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
  } catch (e) {
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
  } catch (e) {
    console.log(e);
  }
};

export { fetchLikes, addToLikes, deleteFromLikes, clearAllLikes };
