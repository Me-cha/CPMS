const initialState = {
  trainings: [],
};

const trainingActionReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRAININGS":
      return {
        ...state,
        trainings: action.payload,
      };
    case "ADD_TRAINING":
      return {
        ...state,
        error: action.error,
      };
    case "DELETE_TRAINING":
      return {
        ...state,
        trainings: state.trainings.filter((training) => training._id !== action.payload),
      };
    case "UPDATE_TRAINING":
      return {
        ...state,
        trainings: state.trainings.map((training) =>
        training._id === action.payload.result._id ? action.payload.result : training
        ),
      };
    case "TRAINING_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default trainingActionReducers;
