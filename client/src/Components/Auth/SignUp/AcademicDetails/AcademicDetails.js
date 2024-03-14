import React, { useContext } from "react";
import Box from "@mui/material/Box";
import {
  Card,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const AcademicDetails = ({ formValue, errors, handleInputChange }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          margin: "auto",
          width: "40vw",
          height: "65vh",
        },
      }}
    >
      <Card
        elevation={2}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3vh 4vw",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <h6>Batch</h6>
              <TextField
                name="batch"
                value={formValue.batch}
                onChange={handleInputChange}
                error={!!errors.batch}
                helperText={errors.batch}
              />
            </Stack>

            <Stack direction="column" spacing={1}>
              <h6>Branch</h6>
              <TextField
                name="branch"
                value={formValue.branch}
                onChange={handleInputChange}
                error={!!errors.branch}
                helperText={errors.branch}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <h6>Degree</h6>
              <TextField
                name="degree"
                value={formValue.degree}
                onChange={handleInputChange}
                error={!!errors.degree}
                helperText={errors.degree}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <h6>Average CGPA</h6>
              <TextField
                name="avg_cgpa"
                value={formValue.avg_cgpa}
                onChange={handleInputChange}
                error={!!errors.avg_cgpa}
                helperText={errors.avg_cgpa}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <h6>SSC Marks</h6>
              <TextField
                name="ssc_marks"
                value={formValue.ssc_marks}
                onChange={handleInputChange}
                error={!!errors.ssc_marks}
                helperText={errors.ssc_marks}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <h6>SSC Board</h6>
              <TextField
                name="ssc_board"
                value={formValue.ssc_board}
                onChange={handleInputChange}
                error={!!errors.ssc_board}
                helperText={errors.ssc_board}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <h6>HSC Marks</h6>
              <TextField
                name="hsc_marks"
                value={formValue.hsc_marks}
                onChange={handleInputChange}
                error={!!errors.hsc_marks}
                helperText={errors.hsc_marks}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <h6>HSC Board</h6>
              <TextField
                name="hsc_board"
                value={formValue.hsc_board}
                onChange={handleInputChange}
                error={!!errors.hsc_board}
                helperText={errors.hsc_board}
              />
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default AcademicDetails;
