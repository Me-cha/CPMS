import axios from "axios";

const URL = "http://localhost:8080";

export const addTrainingAction =
  (TrainingData, navigate) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${URL}/api/training/addtraining`,
        TrainingData
      );
      if (res.status === 200) {
        dispatch({
          type: "ADD_TRAINING",
          payload: res.data.trainings,
        });
        alert("Training added successfully");
        navigate(-1);
      } else {
        alert("try again");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding the Training");
    }
  };

export const getTrainingsAction = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/api/training/getalltrainings`);

    if (response.status === 200) {
      dispatch({
        type: "GET_TRAININGS",
        payload: response.data.trainings,
      });
    } else {
      dispatch({
        type: "TRAININGS_ERROR",
        error: "Error fetching TRAININGS",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "TRAININGS_ERROR", error: error.message });
  }
};

export const deleteTrainingAction =
  (TrainingId, setDeleteStatus) => async (dispatch) => {
    try {
      const response = await axios.delete(
        `${URL}/api/training/deletetraining/${TrainingId}`
      );

      if (response.status === 200) {
        dispatch({
          type: "DELETE_TRAINING",
          payload: response.data.TrainingId,
        });
        setDeleteStatus(true);
      } else {
        dispatch({ type: "TRAINING_ERROR", error: response.data.msg });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: "TRAINING_ERROR", error: error.message });
    }
  };

export const updateTrainingAction = (trainingData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${URL}/api/training/updatetraining/${trainingData._id}`,
      trainingData
    );

    if (response.status === 200) {
      dispatch({
        type: "UPDATE_TRAINING",
        payload: response.data.result,
      });
    } else {
      dispatch({ type: "TRAINING_ERROR", error: response.data.message });
      alert("try again");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "TRAINING_ERROR", error: error.message });
  }
};
