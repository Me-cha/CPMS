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
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fab from "@mui/material/Fab";
import Upload from "../../../../uploader/uploader";
import "./newTrainingForm.css";
import { addTrainingAction } from "../../../../../redux/action/trainingActions";

const TrainingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [training, setTraining] = useState({
    title: "",
    description: "",
    date: null,
    duration: 0,
    location: "To be announced",
    trainer: {
      name: "",
      bio: "No bio available",
      contact: "Not provided",
    },
    eligibility: {
      department: "All Departments",
      batch: "All Batches",
    },
    registration: {
      isOpen: true,
      registrationDeadline: null,
    },
    attendees: [],
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = (training) => {
    const status = dispatch(addTrainingAction(training, navigate));
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
            onClick={() => handleSave(training)}
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
        <Card sx={{ width: "70vw", marginTop: "2vh" }}>
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
                    name="title"
                    value={training.title}
                    InputProps={{
                      style: { fontSize: "1.5rem", fontWeight: "bold" },
                    }}
                    variant="standard"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        title: e.target.value,
                      })
                    }
                  />
                  <TextField
                    name="name"
                    value={training.trainer.name}
                    fontSize="small"
                    variant="standard"
                    size="small"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        trainer: {
                          ...training.trainer,
                          name: e.target.value,
                        },
                      })
                    }
                  />
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
                      onChange={(e) =>
                        setTraining({
                          ...training,
                          trainer: {
                            ...training.trainer,
                            bio: e.target.value,
                          },
                        })
                      }
                    />
                  </Stack>{" "}
                  <h6>Trainer Contact</h6>
                  <TextField
                    name="contact"
                    multiline
                    rows={1}
                    value={training.trainer.contact}
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        trainer: {
                          ...training.trainer,
                          contact: e.target.value,
                        },
                      })
                    }
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
                  onChange={(e) =>
                    setTraining({
                      ...training,
                      description: e.target.value,
                    })
                  }
                />
              </Stack>
              {/* <Stack direction="column" spacing={1}>
                <h6>Registration Link</h6>
                <TextField
                  name="registration_link"
                  multiline
                  rows={1}
                  value={training.registration.registration_link}
                  onChange={(e) =>
                    setTraining({
                      ...training,
                      registration: {
                        ...training.registration,
                        registration_link: e.target.value,
                      },
                    })
                  }
                />
              </Stack> */}
              <Stack direction="column" spacing={1}>
                <h6>training Location</h6>
                <TextField
                  name="location"
                  multiline
                  rows={1}
                  value={training.location}
                  onChange={(e) =>
                    setTraining({
                      ...training,
                      location: e.target.value,
                    })
                  }
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Eligible Courses</h6>
                <TextField
                  name="department"
                  multiline
                  rows={3}
                  value={training.eligibility.department}
                  onChange={(e) =>
                    setTraining({
                      ...training,
                      eligibility: {
                        ...training.eligibility,
                        department: e.target.value,
                      },
                    })
                  }
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Eligible Batch</h6>
                <TextField
                  name="batch"
                  multiline
                  rows={3}
                  value={training.eligibility.batch}
                  onChange={(e) =>
                    setTraining({
                      ...training,
                      eligibility: {
                        ...training.eligibility,
                        batch: e.target.value,
                      },
                    })
                  }
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
                            onChange={(date) =>
                              setTraining({ ...training, date: date })
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
                          Duration (in weeks)
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="duration"
                            className="tableInputValues"
                            variant="outlined"
                            value={training.duration}
                            sx={{ width: "7vw" }}
                            onChange={(e) =>
                              setTraining({
                                ...training,
                                duration: e.target.value,
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
                            onChange={(date) =>
                              setTraining({
                                ...training,
                                registration: {
                                  ...(training.registration || {}),
                                  registrationDeadline: date,
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

export default TrainingForm;
