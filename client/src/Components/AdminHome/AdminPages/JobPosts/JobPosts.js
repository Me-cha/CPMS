import React, { useState } from "react";
import "./jobPost.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AdminJobPosts() {
  const location = useLocation();
  const path = location.pathname.split("/").pop();

  const pathToValue = {
    applicationList: 0,
    manageJobs: 1,
  };

  const [value, setValue] = useState(pathToValue[path] || 0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewJob = () => {
    navigate("/adminHome/applicationForm");
  };

  return (
    <div className="jobPost w-[80vw]" style={{ margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1vh" }}>Job Posts</h1>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={{ md: 90, sm: 6 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Applications"
              component={Link}
              to="applicationList"
              style={{ textDecoration: "none" }}
            />
            <Tab
              label="Manage Jobs"
              component={Link}
              to="manageJobs"
              style={{ textDecoration: "none" }}
            />
          </Tabs>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            style={{ marginTop: "0.5vh" }}
            onClick={handleNewJob}
          >
            <AddIcon />
            Add Job
          </Fab>
        </Stack>
      </Box>
      <div className="jobPostBody flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
