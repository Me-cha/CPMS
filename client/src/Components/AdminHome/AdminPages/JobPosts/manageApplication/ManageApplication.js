import React, { useEffect, useMemo, useState } from "react";
import { Table } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getCandidates } from "../../../../../redux/action/jobActions";

const { Column, HeaderCell, Cell } = Table;

const ManageApplication = () => {
  const candidates = useSelector(
    (state) => state.jobActions.candidates.appliedStudents
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const jobID = useMemo(
    () => (location.state ? location.state.jobId : ""),
    [location.state]
  );
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    if (jobID) {
      dispatch(getCandidates(jobID));
    }
  }, [dispatch, jobID]);

  useEffect(() => {
    if (candidates && candidates.appliedStudents) {
      const updatedCandidates = candidates.appliedStudents.map((student) => ({
        ...student,
        candidate_status: candidates.candidate_status,
      }));
      setStudentData(updatedCandidates);
    }
  }, [candidates]);

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box sx={{ padding: 3 }}>
      <button onClick={handleBack}> {"<"}Back </button>
      <div
        style={{
          width: "60vw",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          margin: "auto",
          border: "2px solid grey",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Typography variant="h6">Candidates</Typography>
        <Table
          height={500}
          data={studentData}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
          affixHeader={0}
          style={{}}
        >
          <Column width={100}>
            <HeaderCell>UID</HeaderCell>
            <Cell dataKey="uid" />
          </Column>

          <Column width={150}>
            <HeaderCell>NAME</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={100}>
            <HeaderCell>BATCH</HeaderCell>
            <Cell dataKey="batch" />
          </Column>

          <Column width={100}>
            <HeaderCell>BRANCH</HeaderCell>
            <Cell dataKey="branch" />
          </Column>

          <Column width={300}>
            <HeaderCell>COLLEGE EMAIL</HeaderCell>
            <Cell dataKey="college_email" />
          </Column>

          <Column width={120}>
            <HeaderCell>Application Status</HeaderCell>
            <Cell dataKey="candidate_status" />
          </Column>
        </Table>
      </div>
    </Box>
  );
};

export default ManageApplication;
