const initialState = {
  students: [],
};

const userControlsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STUDENT":
      return {
        ...state,
        students: action.payload,
      };
    case "GET_STUDENTS_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default userControlsReducers;
