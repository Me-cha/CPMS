import React, { useState } from "react";
import "./jobPost.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function AdminJobPosts() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewJob = () => {
    navigate("/adminHome/applicationForm");
  };

  return (
    <div className="jobPost w-[75vw]">
      <h1 style={{ textAlign: "center", marginBottom: "1vh" }}>Job Posts</h1>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={{ md: 108, sm: 40 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label="Applications"
              component={Link}
              to="applicationList"
              style={{ textDecoration: "none" }}
            />
            {/*    <Tab
          label="New Application"
            component={Link}
            to="applicationForm"
            style={{ textDecoration: "none" }}
          /> */}
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
