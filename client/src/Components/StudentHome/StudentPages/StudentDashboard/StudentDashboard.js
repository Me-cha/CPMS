import React, { useEffect } from "react";
import { Panel, Row, Col } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsAction } from "../../../../redux/action/userControls";
import { getJobsAction } from "../../../../redux/action/jobActions";
import { getTrainingsAction } from "../../../../redux/action/trainingActions";

function StudentDashboard() {
  const studentID = useSelector((state) => state.auth.data._id);
  const applications = useSelector((state) => state.userControls.applications);
  const TotalJobs = useSelector((state) => state.jobActions.jobs);
  const TotalTrainings = useSelector(
    (state) => state.trainingActions.trainings
  );

  console.log(applications);

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
              {TotalJobs.length}
            </Panel>
          </Col>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Jobs Applied"
              style={{ backgroundColor: "white" }}
            >
              {applications.jobApplications.length}
            </Panel>
          </Col>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Total Trainings"
              style={{ backgroundColor: "white" }}
            >
              {TotalTrainings.length}
            </Panel>
          </Col>
          <Col md={6} sm={12}>
            <Panel
              bordered
              header="Trainings Attended"
              style={{ backgroundColor: "white" }}
            >
              {applications.trainingApplications.length}
            </Panel>
          </Col>
        </Row>
      </div>
      <div
        className="flex lg:flex-row lg:align-center lg:justify-around lg:w-[85vw] lg:py-4
      sm:flex-col sm:justify-center sm:items-center  sm:w-[80vw] "
        style={{
          width: "75vw",
          maxHeight: "73vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      ></div>
    </div>
  );
}

export default StudentDashboard;
