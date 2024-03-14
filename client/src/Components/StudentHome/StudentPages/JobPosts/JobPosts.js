import React from "react";
import "./jobPost.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

export default function StudentJobPosts() {
  return (
    <div className="jobPost w-[75vw]">
      <h1 style={{ textAlign: "center", marginBottom: "1vh" }}>Job Posts</h1>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={{ md: 108, sm: 40 }}>
          <Tabs>
            <Tab
              label="Applications"
              component={Link}
              to="student_applicationList"
              style={{ textDecoration: "none" }}
            />
          </Tabs>
        </Stack>
      </Box>
      <div className="jobPostBody flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
