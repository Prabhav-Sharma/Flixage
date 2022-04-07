import axios from "axios";
import { toast } from "react-toastify";
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
      type: "LOGIN",
      payload: {
        user: response.data.foundUser,
        token: response.data.encodedToken,
      },
    });
    console.log(response);
    localStorage.setItem("token", response.data.encodedToken);
    toast.success(`Welcome back, ${response.data.foundUser.firstName}`);
  } catch (e) {
    toggler(false);
    toast.error("Wrong Credentials");
    console.log(e);
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
      type: "SIGN_UP",
      payload: {
        user: response.data.createdUser,
        token: response.data.encodedToken,
      },
    });
    localStorage.setItem("token", response.data.encodedToken);
    toast.success(
      `Ahoy, welcome aboard, ${response.data.createdUser.fullName} `
    );
  } catch (e) {
    toggler(false);
    if (e.message.includes("422")) {
      toast.error("Account Already exists");
      return;
    }
    toast.error("Uh oh, something broke 🥺");
    console.log(e);
  }
};

export { login, signup };
