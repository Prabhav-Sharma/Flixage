import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_HISTORY_ACTION } from "../utils";

const fetchHistory = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/api/user/history",
      headers: {
        authorization: token,
      },
    });
    dispatcher({
      type: UPDATE_HISTORY_ACTION,
      payload: { history: response.data.history },
    });
  } catch (e) {
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};

const addToHistory = async (requestData, token, dispatcher) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/api/user/history",
      headers: { authorization: token },
      data: requestData,
    });
    dispatcher({
      type: UPDATE_HISTORY_ACTION,
      payload: { history: response.data.history },
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteFromHistory = async (id, token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `/api/user/history/${id}`,
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_HISTORY_ACTION,
      payload: { history: response.data.history },
    });

    toast.success("Huh, what video? it's gone...");
  } catch (e) {
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};

const clearAllHistory = async (token, dispatcher) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: "/api/user/history/all",
      headers: { authorization: token },
    });
    dispatcher({
      type: UPDATE_HISTORY_ACTION,
      payload: { history: response.data.history },
    });
    toast.success("It's like nothing ever happened between us 🥺");
  } catch (e) {
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};
export { fetchHistory, addToHistory, deleteFromHistory, clearAllHistory };
