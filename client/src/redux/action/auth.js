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
            _id: response.data.result._id,
            email: response.data.result.email,
            college_email: response.data.result.college_email,
            uid: response.data.result.uid,
            name: response.data.result.name,
            eligibility_info: {
              avg_cgpa: response.data.result.avg_cgpa,
              hsc_marks: response.data.result.hsc_marks,
              ssc_marks: response.data.result.ssc_marks,
              batch: response.data.result.batch,
              branch: response.data.result.branch,
            },
          },
        });
        localStorage.setItem(
          "Profile",
          JSON.stringify({
            _id: response.data.result._id,
            email: response.data.result.email,
            college_email: response.data.result.college_email,
            uid: response.data.result.uid,
            name: response.data.result.name,
            eligibility_info: {
              avg_cgpa: response.data.result.avg_cgpa,
              hsc_marks: response.data.result.hsc_marks,
              ssc_marks: response.data.result.ssc_marks,
              batch: response.data.result.batch,
              branch: response.data.result.branch,
            },
          })
        );
        if (loginCredentials.select === "student") {
          navigate("/studentHome/studentDashboard");
        } else {
          navigate("/adminHome/adminDashboard");
        }
        return setLogin(true);
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
  localStorage.clear();
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
