const initialState = {
  jobs: [],
};

const jobActionReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOBS":
      return {
        ...state,
        jobs: action.payload,
      };
    case "ADD_JOB":
      return {
        ...state,
        error: action.error,
      };
    case "DELETE_JOB":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    case "UPDATE_JOB":
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload.result._id ? action.payload.result : job
        ),
      };
    case "UPDATE_JOB_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default jobActionReducers;
