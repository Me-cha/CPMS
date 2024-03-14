import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Checkbox,
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
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Upload from "../../../../uploader/uploader";
import logo from "../../../../Logo/cpmsLogo.png";
import "./newApplication.css";
import { addJobAction } from "../../../../../redux/action/jobActions";

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    company_name: "",
    company_email: "",
    company_website_url: "",
    company_location: "",
    company_description: "",

    job_tags: {
      organization_type: "Technology",
      industry_sector: "Public Corporation",
      job_type: "Full-Time",
      location_Type: "Remote",
    },

    job_info: {
      job_profile: "",
      job_description: "",
      job_registration_link: "",
      job_location: "",
    },

    eligibility: {
      passout_batch: "",
      eligible_courses: "",
      avg_cgpa: "",
      min_12_percent: "",
      service_agreement_duration: "",
    },

    package: {
      base_salary: "",
      stock_options: "",
    },

    selection_process: {
      written_test: false,
      technical_interview: false,
      hr_interview: false,
    },

    deadline_date: null,
    attendance: false,
    candidates: [],
    timestamp: null,
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = (job) => {
    const status = dispatch(addJobAction(job, navigate));
  };
  return (
    <div className="viewApplication">
      <Stack direction="row" spacing={{ md: 117, sm: 53 }} marginBottom={1}>
        <Button variant="text" onClick={handleBack} style={{ color: "gray" }}>
          {"< "}Back
        </Button>
        <Stack direction="row" spacing={2}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            style={{ marginTop: "1vh" }}
            onClick={() => handleSave(job)}
          >
            <SaveAltOutlinedIcon />
            Save
          </Fab>
        </Stack>
      </Stack>
      <Box
        sx={{
          maxWidth: "80vw",
          maxHeight: "83vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "0vh 1vw 1vh",
        }}
      >
        <Card key={job._id} sx={{ width: "70vw", marginTop: "2vh" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Stack direction="row" spacing={2} padding={2}>
                <Upload />

                <Stack direction="column" spacing={1}>
                  <TextField
                    name="job_profile"
                    value={job.job_info.job_profile}
                    InputProps={{
                      style: { fontSize: "1.5rem", fontWeight: "bold" },
                    }}
                    variant="standard"
                    onChange={(e) =>
                      setJob({
                        ...job,
                        job_info: {
                          ...job.job_info,
                          job_profile: e.target.value,
                        },
                      })
                    }
                  />
                  <TextField
                    name="company_name"
                    value={job.company_name}
                    fontSize="small"
                    variant="standard"
                    size="small"
                    onChange={(e) =>
                      setJob({ ...job, company_name: e.target.value })
                    }
                  />
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
                    onChange={(e) =>
                      setJob({ ...job, company_email: e.target.value })
                    }
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Company Website</h6>
                  <TextField
                    name="company_website_url"
                    multiline
                    rows={1}
                    value={job.company_website_url}
                    onChange={(e) =>
                      setJob({ ...job, company_website_url: e.target.value })
                    }
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Company Location</h6>
                  <TextField
                    name="company_location"
                    multiline
                    rows={1}
                    value={job.company_location}
                    onChange={(e) =>
                      setJob({ ...job, company_location: e.target.value })
                    }
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Company Description</h6>
                  <TextField
                    name="company_description"
                    multiline
                    rows={3}
                    value={job.company_description}
                    onChange={(e) =>
                      setJob({ ...job, company_description: e.target.value })
                    }
                  />
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <CardContent>
            <Stack direction="row" spacing={1}>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                Job Type
                <Select
                  value={job.job_tags.job_type || ""}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_tags: {
                        ...job.job_tags,
                        job_type: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                Location Type
                <Select
                  value={job.job_tags.location_Type || ""}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_tags: {
                        ...job.job_tags,
                        location_Type: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                Organization Type
                <Select
                  value={job.job_tags.organization_type || ""}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_tags: {
                        ...job.job_tags,
                        organization_type: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                  <MenuItem value="Retail">Retail</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Hospitality">Hospitality</MenuItem>
                  <MenuItem value="Energy">Energy</MenuItem>
                  <MenuItem value="Transportation">Transportation</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                Industry Sector
                <Select
                  value={job.job_tags.industry_sector || ""}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_tags: {
                        ...job.job_tags,
                        industry_sector: e.target.value,
                      },
                    })
                  }
                >
                  <MenuItem value="Public Corporation">
                    Public Corporation
                  </MenuItem>
                  <MenuItem value="Private Company">Private Company</MenuItem>
                  <MenuItem value="Non-profit Organization">
                    Non-profit Organization
                  </MenuItem>
                  <MenuItem value="Government Agency">
                    Government Agency
                  </MenuItem>
                  <MenuItem value="Startup">Startup</MenuItem>
                  <MenuItem value="Educational Institution">
                    Educational Institution
                  </MenuItem>
                  <MenuItem value="Research Institute">
                    Research Institute
                  </MenuItem>
                  <MenuItem value="Consulting Firm">Consulting Firm</MenuItem>
                  <MenuItem value="Healthcare Provider">
                    Healthcare Provider
                  </MenuItem>
                  <MenuItem value="Legal Firm">Legal Firm</MenuItem>
                </Select>
              </FormControl>
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
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_info: {
                        ...job.job_info,
                        job_description: e.target.value,
                      },
                    })
                  }
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Registration Link</h6>
                <TextField
                  name="job_registration_link"
                  multiline
                  rows={1}
                  value={job.job_info.job_registration_link}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_info: {
                        ...job.job_info,
                        job_registration_link: e.target.value,
                      },
                    })
                  }
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Job Location</h6>
                <TextField
                  name="job_location"
                  multiline
                  rows={1}
                  value={job.job_info.job_location}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      job_info: {
                        ...job.job_info,
                        job_location: e.target.value,
                      },
                    })
                  }
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Eligible Courses</h6>
                <TextField
                  name="eligible_courses"
                  multiline
                  rows={3}
                  value={job.eligibility.eligible_courses}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      eligibility: {
                        ...job.eligibility,
                        eligible_courses: e.target.value,
                      },
                    })
                  }
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Eligible Batch</h6>
                <TextField
                  name="passout_batch"
                  multiline
                  rows={3}
                  value={job.eligibility.passout_batch}
                  onChange={(e) =>
                    setJob({
                      ...job,
                      eligibility: {
                        ...job.eligibility,
                        passout_batch: e.target.value,
                      },
                    })
                  }
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
                            onChange={(e) =>
                              setJob({
                                ...job,
                                eligibility: {
                                  ...job.eligibility,
                                  avg_cgpa: e.target.value,
                                },
                              })
                            }
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
                            onChange={(e) =>
                              setJob({
                                ...job,
                                eligibility: {
                                  ...job.eligibility,
                                  min_12_percent: e.target.value,
                                },
                              })
                            }
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
                            onChange={(e) =>
                              setJob({
                                ...job,
                                eligibility: {
                                  ...job.eligibility,
                                  service_agreement_duration: e.target.value,
                                },
                              })
                            }
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
                            onChange={(e) =>
                              setJob({
                                ...job,
                                package: {
                                  ...job.package,
                                  base_salary: e.target.value,
                                },
                              })
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="stock_options"
                            className="tableInputValues"
                            variant="outlined"
                            InputProps={{
                              style: { textAlign: "right" },
                            }}
                            value={job.package.stock_options}
                            sx={{ width: "7vw" }}
                            onChange={(e) =>
                              setJob({
                                ...job,
                                package: {
                                  ...job.package,
                                  stock_options: e.target.value,
                                },
                              })
                            }
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
                            onChange={(e) =>
                              setJob({
                                ...job,
                                selection_process: {
                                  ...job.selection_process,
                                  written_test: e.target.checked,
                                },
                              })
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={job.selection_process.technical_interview}
                            onChange={(e) =>
                              setJob({
                                ...job,
                                selection_process: {
                                  ...job.selection_process,
                                  technical_interview: e.target.checked,
                                },
                              })
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={job.selection_process.hr_interview}
                            onChange={(e) =>
                              setJob({
                                ...job,
                                selection_process: {
                                  ...job.selection_process,
                                  hr_interview: e.target.checked,
                                },
                              })
                            }
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
    </div>
  );
};

export default ApplicationForm;
