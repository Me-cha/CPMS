const initialState = {
  students: [],
  applications: [],
};

const userControlsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STUDENT":
      return {
        ...state,
        students: action.payload,
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };
    case "GET_STUDENT_APPLICATIONS":
      return {
        ...state,
        applications: {
          jobApplications: action.payload.applications,
          trainingApplications: action.payload.trainingApplications,
          message: action.payload.message,
        },
      };
    case "GET_STUDENTS_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userControlsReducers;
