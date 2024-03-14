import axios from "axios";

const URL = "http://localhost:8080";

export const signupAction =
  (authData, navigate) => async (dispatch, getState) => {
    const res = await axios.post(`${URL}/api/user/signup`, authData);

    const {
      auth: { data },
    } = getState();

    try {
      localStorage.setItem("Profile", JSON.stringify({ ...data, ...authData }));

      dispatch({
        type: "AUTH",
        payload: res.data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

export const loginAction =
  (loginCredentials, setLogin, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/api/user/login`,
        loginCredentials
      );

      if (response.status === 200) {
        dispatch({
          type: "AUTH",
          payload: {
            ...response.data,
            select: loginCredentials.select, // Use the select from loginCredentials
            email: loginCredentials.email, // Use the email from loginCredentials
            password: loginCredentials.password, // Use the password from loginCredentials
          },
        });
        localStorage.setItem("Profile", JSON.stringify({ ...response.data }));
        if (loginCredentials.select === "student") {
          navigate("/studentHome/studentDashboard");
        } else {
          navigate("/adminHome/adminDashboard");
        }
        return setLogin(true); // Set login status to true
      } else {
        dispatch({ type: "AUTH_ERROR", error: "Invalid login credentials" });
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "AUTH_ERROR", error: error.message });
      alert("Invalid login");
    }
  };

export const logoutAction = (setLogin, navigate) => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  navigate("/");
  return setLogin(false);
};

export const coSignupAction = (authData) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${URL}/api/user/coordinator/signup`,
      authData
    );
    dispatch({
      type: "AUTH",
      payload: {
        ...res.data,
        uid: res.data.uid,
        name: res.data.name,
        branch: res.data.branch,
        contact: res.data.contact,
        email: res.data.email,
        password: res.data.password,
      },
    });
    return res.status;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return { error: data, status };
    } else {
      return { error: error.message };
    }
  }
};
