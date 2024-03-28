import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

function createData(Title, Host, JoinMeet) {
  return { Title, Host, JoinMeet };
}

const rows = [
  createData("Demo Meet 1", "Admin 1", "Join"),
  createData("Demo Meet 2", "Admin 2", "Join"),
  createData("Demo Meet 3", "Admin 3", "Join"),
];

export default function JoinMeeting() {
  const navigate = useNavigate();
  const handleJoin = () => {
    navigate("/studentHome/jitsiMeeting");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Host</StyledTableCell>
            <StyledTableCell align="right">Join Meet</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.Title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Host}</StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={handleJoin} variant="contained">
                  {row.JoinMeet}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
