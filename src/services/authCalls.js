import axios from "axios";
const login = async (email, password, toggler, dispatcher) => {
  toggler(true);
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: {
        email: email,
        password: password,
      },
    });
    if (response.status === 200) {
      dispatcher({ type: "LOGIN", payload: { user: response.data.foundUser } });
      localStorage.setItem("token", response.data.encodedToken);
      toggler(false);
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

const signup = async (fullname, email, password, toggler, dispatcher) => {
  toggler(true);
  try {
    const response = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: {
        fullname: fullname,
        email: email,
        password: password,
      },
    });
    dispatcher({
      type: "SIGN_UP",
      payload: { user: response.data.createdUser },
    });
    localStorage.setItem("token", response.data.encodedToken);
    toggler(false);
  } catch (e) {
    toggler(false);
    if (e.message.includes("422")) {
      alert("Account already exists");
    }
    console.log(e);
  }
};

export { login, signup };
