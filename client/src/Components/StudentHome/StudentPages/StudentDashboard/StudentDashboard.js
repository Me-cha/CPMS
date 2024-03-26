import React, { useEffect } from "react";
import {
  Badge,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Panel, Row, Col } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsAction } from "../../../../redux/action/userControls";
import { getJobsAction } from "../../../../redux/action/jobActions";
import { getTrainingsAction } from "../../../../redux/action/trainingActions";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const studentID = useSelector((state) => state.auth.data._id);
  const jobApplications = useSelector(
    (state) => state.userControls.applications.jobApplications
  );
  const trainingApplications = useSelector(
    (state) => state.userControls.applications.trainingApplications
  );
  const TotalJobs = useSelector((state) => state.jobActions.jobs);
  const TotalTrainings = useSelector(
    (state) => state.trainingActions.trainings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplicationsAction(studentID));
    dispatch(getJobsAction());
    dispatch(getTrainingsAction());
  }, [dispatch, studentID]);

  return (
    <div className="flex flex-col sm:w-[100%] sm:justify-between sm:items-center sm:h-[90vh] sm:py-2">
      <h1>Student Dashboard</h1>
      <div className="NumAnalysis lg:w-[85vw] ">
        <Row>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Total Applications"
              style={{ backgroundColor: "white" }}
            >
              {TotalJobs?.length}
            </Panel>
          </Col>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Jobs Applied"
              style={{ backgroundColor: "white" }}
            >
              {jobApplications?.length}
            </Panel>
          </Col>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Total Trainings"
              style={{ backgroundColor: "white" }}
            >
              {TotalTrainings?.length}
            </Panel>
          </Col>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Trainings Attended"
              style={{ backgroundColor: "white" }}
            >
              {trainingApplications?.length}
            </Panel>
          </Col>
        </Row>
      </div>
      <Box
        sx={{
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          width: "50vw",
          bgcolor: "background.paper",
          height: "50vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={1} direction="row" alignItems={"center"}>
            <Typography variant="h6">Notifications</Typography>
            <Badge badgeContent={TotalJobs?.length} color="primary">
              <NotificationsIcon color="action" />
            </Badge>
          </Stack>
        </Box>
        <List
          sx={{
            overflowY: "auto",
            maxHeight: "100%",
            scrollbarWidth: "none",
          }}
        >
          {TotalJobs.map((job) => (
            <React.Fragment key={job._id}>
              <ListItem
                alignItems="flex-start"
                sx={{ pl: 3, cursor: "pointer" }}
                onClick={() =>
                  navigate("/studentHome/student_ViewApplication", {
                    state: { job },
                  })
                }
              >
                <ListItemText
                  primary={job.company_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {job.job_info.job_profile}
                      </Typography>
                      {" — " + job.job_info.job_description}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default StudentDashboard;
