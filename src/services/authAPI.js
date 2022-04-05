import axios from "axios";
const login = async (requestData, toggler, dispatcher) => {
  toggler(true);
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: requestData,
    });
    if (response.status === 200) {
      toggler(false);
      dispatcher({ type: "LOGIN", payload: { user: response.data.foundUser } });
      localStorage.setItem("token", response.data.encodedToken);
      return;
    }
    toggler(false);
    alert("Wrong Credentials");
  } catch (e) {
    toggler(false);
    alert("Wrong Credentials");
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
      payload: { user: response.data.createdUser },
    });
    localStorage.setItem("token", response.data.encodedToken);
  } catch (e) {
    toggler(false);
    if (e.message.includes("422")) {
      alert("Account already exists");
    }
    console.log(e);
  }
};

export { login, signup };
