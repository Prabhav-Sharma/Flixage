import axios from "axios";
import { toast } from "react-toastify";
import { LOGIN_ACTION, SIGNUP_ACTION } from "../utils";
const login = async (requestData, toggler, dispatcher) => {
  toggler(true);
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: requestData,
    });
    toggler(false);
    dispatcher({
      type: LOGIN_ACTION,
      payload: {
        user: response.data.foundUser,
        token: response.data.encodedToken,
      },
    });
    localStorage.setItem("token", response.data.encodedToken);
    toast.success(`Welcome back, ${response.data.foundUser.userName}`);
    return "SUCCESS";
  } catch (e) {
    toggler(false);
    toast.error("Wrong Credentials");
    console.log(e);
    return "FAILURE";
  }
};

const signup = async (requestData, toggler, dispatcher) => {
  toggler(true);
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: requestData,
    });

    toggler(false);
    dispatcher({
      type: SIGNUP_ACTION,
      payload: {
        user: response.data.createdUser,
        token: response.data.encodedToken,
      },
    });
    localStorage.setItem("token", response.data.encodedToken);
    toast.success(
      `Ahoy, welcome aboard, ${response.data.createdUser.userName} `
    );
    return "SUCCESS";
  } catch (e) {
    toggler(false);
    if (e.message.includes("422")) {
      toast.error("Account Already exists");
    } else {
      toast.error("Uh oh, something broke 🥺");
      console.log(e);
    }
    return "FAILURE";
  }
};

export { login, signup };
