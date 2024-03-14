const initialState = {
  data: JSON.parse(localStorage.getItem("Profile")) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem(
        "Profile",
        JSON.stringify({ ...(action.data || {}) })
      );
      return { ...state, data: action.payload || {} };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };
    default:
      return state;
  }
};

export default authReducer;
