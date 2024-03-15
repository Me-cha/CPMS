import React, { useEffect, useState } from "react";
import { Table, Button, List } from "rsuite";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getCandidates } from "../../../../../redux/action/jobActions";

const { Column, HeaderCell, Cell } = Table;

const ManageApplication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const jobID = location.state ? location.state.jobId : {};
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    if (jobID) {
      dispatch(getCandidates(jobID));
    }
  }, [dispatch, jobID]);

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

          <Column width={200}>
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

          <Column width={100}>
            <HeaderCell>CONTACT</HeaderCell>
            <Cell>
              {(rowData) => {
                return String(rowData.contact);
              }}
            </Cell>
          </Column>

          <Column width={200}>
            <HeaderCell>COLLEGE EMAIL</HeaderCell>
            <Cell dataKey="college_email" />
          </Column>
        </Table>
      </div>
    </Box>
  );
};

export default ManageApplication;
