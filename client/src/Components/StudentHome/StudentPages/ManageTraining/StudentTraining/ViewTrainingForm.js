import React from "react";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../../../../Logo/cpmsLogo.png";
import "./ViewTrainingForm.css";

const ViewTrainingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const training = location.state ? location.state.training : {};

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
      {training ? (
        <Box
          key={training._id}
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
                      {training.title}
                    </div>
                    <h6>{training.trainer.name}</h6>
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" spacing={1}>
                  <Stack direction="column" spacing={1}>
                    <Stack direction="column" spacing={1}>
                      <h6>Trainer Bio</h6>
                      <TextField
                        name="bio"
                        multiline
                        rows={3}
                        value={training.trainer.bio}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Stack>{" "}
                    <h6>Trainer Contact</h6>
                    <TextField
                      name="contact"
                      multiline
                      rows={1}
                      value={training.trainer.contact}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <CardContent>
              <Stack direction="column" spacing={3}>
                <Stack direction="column" spacing={1}>
                  <h6>Description</h6>
                  <TextField
                    name="description"
                    multiline
                    rows={8}
                    value={training.description}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>training Location</h6>
                  <TextField
                    name="location"
                    multiline
                    rows={1}
                    value={training.location}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Eligible Courses</h6>
                  <TextField
                    name="department"
                    multiline
                    rows={3}
                    value={training.eligibility.department}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Eligible Batch</h6>
                  <TextField
                    name="batch"
                    multiline
                    rows={3}
                    value={training.eligibility.batch}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <h6>Other Details</h6>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Start Date
                          </TableCell>
                          <TableCell align="right">
                            <DatePicker
                              name="date"
                              selected={
                                training.date ? new Date(training.date) : null
                              }
                              disabled={true}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Duration (in weeks)
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="duration"
                              className="tableInputValues"
                              variant="outlined"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={training.duration}
                              sx={{ width: "7vw" }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Registration Deadline
                          </TableCell>
                          <TableCell align="right">
                            <DatePicker
                              name="registration_deadline"
                              selected={
                                training.registration.registrationDeadline
                                  ? new Date(
                                      training.registration.registrationDeadline
                                    )
                                  : null
                              }
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

export default ViewTrainingForm;
