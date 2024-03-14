import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import logo from "../../../../Logo/cpmsLogo.png";
import MChip from "@mui/material-next/Chip";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobsAction } from "../../../../../redux/action/jobActions";

function StudentApplicationList() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobActions.jobs);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getJobsAction());
  }, [dispatch]);

  const handleView = (job) => {
    navigate("/studentHome/student_ViewApplication", { state: { job } });
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
      {jobs.map((job) => (
        <Card
          key={job._id}
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
              title={<h4>{job.job_info.job_profile}</h4>}
              subheader={job.company_name}
              style={{ width: "50vw" }}
            />
            <div></div>
          </Stack>
          <CardContent>
            <Stack direction="row" spacing={1}>
              <Chip label={job.job_tags.job_type} />
              <Chip label={job.job_tags.location_Type} />
              <Chip label={job.job_tags.organization_type} />
              <Chip label={job.job_tags.industry_sector} />
            </Stack>
          </CardContent>
          <CardContent>
            <Stack direction="row" spacing={{ md: 81, sm: 32 }}>
              <MChip
                label={`Register By ${new Date(
                  job.deadline_date
                ).toLocaleDateString("en-GB")}`}
                style={{ fontFamily: "unset", width: "20vw" }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleView(job)}
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
export default StudentApplicationList;
