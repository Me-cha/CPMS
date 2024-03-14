import React, { useState } from "react";
import "./training.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AdminManageTrainings() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewTraining = () => {
    navigate("/adminHome/trainingForm");
  };

  return (
    <div className="trainingPost w-[75vw]">
      <h1 style={{ textAlign: "center", marginBottom: "1vh" }}>
        Manage Training
      </h1>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={{ md: 100, sm: 40 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Trainings"
              component={Link}
              to="trainingList"
              style={{ textDecoration: "none" }}
            />
          </Tabs>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            style={{ marginTop: "0.5vh", width: "12vw" }}
            onClick={handleNewTraining}
          >
            <AddIcon />
            Add Training
          </Fab>
        </Stack>
      </Box>
      <div className="trainingPostBody flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
