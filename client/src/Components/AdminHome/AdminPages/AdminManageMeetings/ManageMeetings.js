import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const JoinMeetingBody = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  gap: "2rem",
  padding: "0px 20px",
  overflowY: "auto",
  scrollbarWidth: "none",
});

const TableMeetingsList = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  overflow: "auto",
  height: "80vh",
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    outline: "1px solid slategrey",
  },
});

const CreateNewMeeting = styled(Card)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  width: "30%",
  height: "50%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "150px",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function JoinMeeting() {
  const [meetings, setMeetings] = React.useState([]);
  const [meeting, setMeeting] = React.useState({
    _id: "",
    Title: "",
    Host: "",
    meetingLink: "",
    status: true,
  });

  const navigate = useNavigate();

  const handleCreate = () => {
    const meetingLink = `https://meet.jit.si/${encodeURIComponent(
      meeting.Title
    )}`;
    const newMeetingLink = { ...meeting, meetingLink };
    setMeetings((prevMeetings) => [...prevMeetings, meeting]);
    console.log(newMeetingLink);
    setMeeting({
      _id: "",
      Title: "",
      Host: "",
      meetingLink: "",
      status: true,
    });
  };

  const handleDelete = () => {
    alert("Meeting Deleted");
  };

  const handleJoin = (Title, Host) => {
    navigate("/adminHome/jitsiMeeting", { state: { Title, Host } });
  };

  const handleStatus = () => {
    const message = meeting.status
      ? "Do you want to deactivate the link?"
      : "Do you want to activate the link?";

    if (window.confirm(message)) {
      setMeeting({ ...meeting, status: !meeting.status });
    }
  };

  return (
    <>
      <h1>Join Meetings</h1>
      <JoinMeetingBody>
        <TableMeetingsList>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 850, maxWidth: 1000 }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">Host</StyledTableCell>
                  <StyledTableCell align="right">Join Meet</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                  <StyledTableCell align="right">
                    Meeting Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={5}>
                      Add a meeting
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  meetings.map((meet) => (
                    <StyledTableRow key={meet._id}>
                      <StyledTableCell component="th" scope="row">
                        {meet.Title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {meet.Host}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          onClick={() => handleJoin(meet.Title, meet.Host)}
                          variant="contained"
                        >
                          Join
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          onClick={handleDelete}
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Checkbox
                          checked={meeting.status}
                          onChange={handleStatus}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TableMeetingsList>
        <CreateNewMeeting>
          <Typography variant="h4"> Create New Meet </Typography>
          <TextField
            label="Meeting Name"
            variant="filled"
            fullWidth
            value={meeting.Title}
            onChange={(e) => setMeeting({ ...meeting, Title: e.target.value })}
          />
          <TextField
            label="Host Name"
            variant="filled"
            fullWidth
            value={meeting.Host}
            onChange={(e) => setMeeting({ ...meeting, Host: e.target.value })}
          />
          <Button onClick={handleCreate} fullWidth variant="contained">
            Create
          </Button>
        </CreateNewMeeting>
      </JoinMeetingBody>
    </>
  );
}
