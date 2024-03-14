import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../../../../Logo/cpmsLogo.png";
import "./ViewApplication.css";

const ViewApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state ? location.state.job : {};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="viewApplication">
      <Stack direction="row" spacing={{ md: 117, sm: 53 }} marginBottom={1}>
        <Button variant="text" onClick={handleBack} style={{ color: "gray" }}>
          {"< "}Back
        </Button>
      </Stack>
      {job ? (
        <Box
          key={job._id}
          sx={{
            maxWidth: "80vw",
            maxHeight: "83vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "0vh 1vw 1vh",
          }}
        >
          <Card sx={{ width: "70vw", marginTop: "2vh" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Stack direction="row" spacing={2} padding={2}>
                  <img src={logo} alt="logo" style={{ height: "10vh" }} />

                  <Stack direction="column" spacing={1}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      {job.job_info.job_profile}
                    </div>
                    <h6>{job.company_name}</h6>
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" spacing={1}>
                  <Stack direction="column" spacing={1}>
                    <h6>Company Email</h6>
                    <TextField
                      name="company_email"
                      multiline
                      rows={1}
                      value={job.company_email}
                      inputProps={{ readOnly: true }}
                    />
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <h6>Company Website</h6>
                    <TextField
                      name="company_website_url"
                      multiline
                      rows={1}
                      value={job.company_website_url}
                      inputProps={{ readOnly: true }}
                    />
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <h6>Company Location</h6>
                    <TextField
                      name="company_location"
                      multiline
                      rows={1}
                      value={job.company_location}
                      inputProps={{ readOnly: true }}
                    />
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <h6>Company Description</h6>
                    <TextField
                      name="company_description"
                      multiline
                      rows={3}
                      value={job.company_description}
                      inputProps={{ readOnly: true }}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <CardContent>
              <Stack direction="row" spacing={1}>
                <Chip label={job.job_tags.job_type} />
                <Chip label={job.job_tags.location_Type} />
                <Chip label={job.job_tags.organization_type} />
                <Chip label={job.job_tags.industry_sector} />
              </Stack>
            </CardContent>
            <CardContent>
              <Stack direction="column" spacing={3}>
                <Stack direction="column" spacing={1}>
                  <h6>Description</h6>
                  <TextField
                    name="job_description"
                    multiline
                    rows={8}
                    value={job.job_info.job_description}
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Registration Link</h6>
                  <TextField
                    name="job_registration_link"
                    multiline
                    rows={1}
                    value={job.job_info.job_registration_link}
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Job Location</h6>
                  <TextField
                    name="job_location"
                    multiline
                    rows={1}
                    value={job.job_info.job_location}
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Eligible Courses</h6>
                  <TextField
                    name="eligible_courses"
                    multiline
                    rows={3}
                    value={job.eligibility.eligible_courses}
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Eligible Batch</h6>
                  <TextField
                    name="passout_batch"
                    multiline
                    rows={3}
                    value={job.eligibility.passout_batch}
                    inputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Eligibility Criteria</h6>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Average CGPA
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="criteriaValue"
                              className="tableInputValues"
                              variant="outlined"
                              value={job.eligibility.avg_cgpa}
                              sx={{ width: "7vw" }}
                              inputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            12th Percentage
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="criteriaValue"
                              className="tableInputValues"
                              variant="outlined"
                              value={job.eligibility.min_12_percent}
                              sx={{ width: "7vw" }}
                              inputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Service Agreement Duration
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="criteriaValue"
                              className="tableInputValues"
                              variant="outlined"
                              value={job.eligibility.service_agreement_duration}
                              sx={{ width: "7vw" }}
                              inputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Other Details</h6>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="right">Base Salary</TableCell>
                          <TableCell align="right">Stock Option</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Package
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="base_salary"
                              className="tableInputValues"
                              variant="outlined"
                              value={job.package.base_salary}
                              sx={{ width: "7vw" }}
                              inputProps={{ readOnly: true }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="stock_options"
                              className="tableInputValues"
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                                style: { textAlign: "right" },
                              }}
                              value={job.package.stock_options}
                              sx={{ width: "7vw" }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="right">Written Test</TableCell>
                          <TableCell align="right">Technical Round</TableCell>
                          <TableCell align="right">Interview Round</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Selection Process
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              checked={job.selection_process.written_test}
                              disabled={true}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              checked={
                                job.selection_process.technical_interview
                              }
                              disabled={true}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Checkbox
                              checked={job.selection_process.hr_interview}
                              disabled={true}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ViewApplication;
