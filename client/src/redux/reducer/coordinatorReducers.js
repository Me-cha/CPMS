const initialState = {
  coordinators: [],
};

const coordinatorControlsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COORDINATOR":
      return {
        ...state,
        coordinators: action.payload,
      };
    case "GET_COORDINATORS_ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "DELETE_COORDINATOR":
      return {
        ...state,
        coordinators: state.coordinators.filter(
          (coordinator) => coordinator._id !== action.payload
        ),
      };
    case "ADD_COORDINATOR_SUCCESS":
      return {
        ...state,
      };
    case "ADD_COORDINATOR_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default coordinatorControlsReducers;
