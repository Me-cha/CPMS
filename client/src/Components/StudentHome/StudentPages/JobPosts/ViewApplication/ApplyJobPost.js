import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { applyJobAction } from "../../../../../redux/action/jobActions";

function ApplyJobPost({ deadline, jobId }) {
  const user = JSON.parse(localStorage.getItem("Profile"));
  const uid = user?.uid;
  const dispatch = useDispatch();

  const handleApply = () => {
    dispatch(applyJobAction(uid, jobId));
  };

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
          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={handleApply}
          >
            Apply
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
export default ApplyJobPost;
