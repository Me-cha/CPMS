import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import {
  WithdrawAction,
  applyAction,
} from "../../../../../redux/action/jobActions";
import { getApplicationsAction } from "../../../../../redux/action/userControls";

function ApplyTraining({ deadline, trainingId }) {
  const appliedTrainings = useSelector(
    (state) => state.userControls.applications.trainingApplications
  );
  const user = JSON.parse(localStorage.getItem("Profile"));
  const uid = user?.uid;
  const studentID = user?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplicationsAction(studentID));
  }, [dispatch, studentID]);

  const handleApply = () => {
    dispatch(applyAction(uid, trainingId)).then(() => {
      dispatch(getApplicationsAction(studentID));
    });
  };

  const handleWithdraw = () => {
    dispatch(WithdrawAction(uid, trainingId)).then(() => {
      dispatch(getApplicationsAction(studentID));
    });
  };

  const isApplied = appliedTrainings?.some((job) => job.job_id === trainingId);

  return (
    <Box className="applyBox" sx={{ placeSelf: "center", ml: 5 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 20, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            Register Here
          </Typography>
          <Typography variant="body1">
            Deadline:{new Date(deadline).toLocaleDateString("en-GB")}
          </Typography>
        </CardContent>
        <CardActions>
          {isApplied ? (
            <Button
              size="large"
              variant="contained"
              fullWidth
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          ) : (
            <Button
              size="large"
              variant="contained"
              fullWidth
              onClick={handleApply}
            >
              Apply
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
export default ApplyTraining;
