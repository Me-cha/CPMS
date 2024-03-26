import React, { useEffect, useState } from "react";
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
import EligibilityList from "../../../../../Middleware/eligibility/EligibleList";
import { Grid, Switch, Typography } from "@mui/material";

function StudentApplicationList() {
  const [toggleEligibleList, setToggleEligibleList] = useState(false);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobActions.jobs);
  const navigate = useNavigate();
  const eligibilityStatus = EligibilityList();
  useEffect(() => {
    dispatch(getJobsAction());
  }, [dispatch]);

  const handleToggle = (event) => {
    setToggleEligibleList(event.target.checked);
  };

  const handleView = (job, isEligible) => {
    navigate("/studentHome/student_ViewApplication", {
      state: { job, isEligible },
    });
  };

  const filteredJobs = toggleEligibleList
    ? jobs
    : jobs.filter((job) => {
        const jobEligibility = eligibilityStatus.find(
          (eligibility) => eligibility.job_id === job._id
        );
        return jobEligibility?.isEligible;
      });
  return (
    <>
      <Typography component="div">
        <Grid
          component="label"
          container
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          <Grid item sx={{ fontSize: "13px" }}>
            SHOW NON-ELIGIBLE JOBS
          </Grid>
          <Grid item>
            <Switch checked={toggleEligibleList} onChange={handleToggle} />
          </Grid>
        </Grid>
      </Typography>

      {filteredJobs.map((job) => {
        const jobEligibility = eligibilityStatus.find(
          (eligibility) => eligibility.job_id === job._id
        );

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
                <div style={{ padding: "30px 30px 0px 0px" }}>
                  <Chip
                    color={jobEligibility?.isEligible ? "success" : "error"}
                    variant="outlined"
                    size="small"
                    label={
                      jobEligibility?.isEligible ? "ELIGIBLE" : "NON-ELIGIBLE"
                    }
                  />
                </div>
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
                    onClick={() => handleView(job, jobEligibility?.isEligible)}
                    style={{ width: "10vw" }}
                  >
                    View
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </>
  );
}
export default StudentApplicationList;
