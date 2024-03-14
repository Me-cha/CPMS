import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import logo from "../../../../Logo/cpmsLogo.png";
import MChip from "@mui/material-next/Chip";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTrainingAction,
  getTrainingsAction,
} from "../../../../../redux/action/trainingActions";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function TrainingList() {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const dispatch = useDispatch();
  const trainings = useSelector((state) => state.trainingActions.trainings);

  const location = useLocation();
  const training = location.state ? location.state.training : {};
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteTrainingAction(id, setDeleteStatus));
  };

  useEffect(() => {
    dispatch(getTrainingsAction());
  }, [dispatch, deleteStatus]);

  const handleView = (training) => {
    navigate("/adminHome/updateTrainingForm", { state: { training } });
  };

  return (
    <div
      className="applicationCards px-[2.5vw] mt-1"
      style={{
        maxHeight: "73vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {trainings &&
        trainings.map((training) => (
          <Card
            key={training._id}
            sx={{
              width: "70vw",
              marginTop: "2vh",
            }}
          >
            <Stack direction="row" spacing={{ md: 29, sm: 4 }}>
              <CardHeader
                avatar={
                  <CardMedia
                    component="img"
                    src={logo}
                    style={{ height: "7vh" }}
                  />
                }
                title={<h4>{training.title}</h4>}
                subheader={training.trainer.name}
                style={{ width: "50vw" }}
              />
              <div>
                <DeleteTwoToneIcon
                  fontSize="large"
                  color="action"
                  style={{ margin: "3vh 0vw 0vh" }}
                  onClick={() => {
                    handleDelete(training._id);
                  }}
                />
              </div>
            </Stack>
            <CardContent>
              <Stack direction="row" spacing={1}>
                <Chip label={`${training.duration} Weeks`} />
                <Chip
                  label={`Starts From ${new Date(
                    training.date
                  ).toLocaleDateString("en-GB")}`}
                />
              </Stack>
            </CardContent>
            <CardContent>
              <Stack direction="row" spacing={{ md: 81, sm: 32 }}>
                <MChip
                  label={`Register By ${new Date(
                    training.registration.registrationDeadline
                  ).toLocaleDateString("en-GB")}`}
                  style={{ fontFamily: "unset", width: "20vw" }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleView(training)}
                  style={{ width: "10vw" }}
                >
                  View
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
export default TrainingList;
