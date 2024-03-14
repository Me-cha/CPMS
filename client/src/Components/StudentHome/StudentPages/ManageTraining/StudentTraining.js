import React from "react";
import "./StudentTraining.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

export default function StudentTrainings() {
  return (
    <div className="trainingPost w-[75vw]">
      <h1 style={{ textAlign: "center", marginBottom: "1vh" }}>
        Manage Training
      </h1>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={{ md: 100, sm: 40 }}>
          <Tabs>
            <Tab
              label="Trainings"
              component={Link}
              to="student_trainingList"
              style={{ textDecoration: "none" }}
            />
          </Tabs>
        </Stack>
      </Box>
      <div className="trainingPostBody flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
