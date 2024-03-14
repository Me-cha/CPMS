import React, { useState } from "react";
import "./AccountDetails.css";
import Box from "@mui/material/Box";
import {
  Card,
  Stack,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";

const AccountDetails = ({ formValue, errors, handleInputChange }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          margin: "0vh auto",
          width: "30vw",
          height: "63vh",
        },
      }}
    >
      <Card
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3vh 1vw 1vh",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack direction="column" spacing={1}>
            <h6>College UID</h6>
            <TextField
              required
              name="uid"
              value={formValue.uid}
              onChange={handleInputChange}
              error={!!errors.uid}
              helperText={errors.uid}
            />
          </Stack>

          <Stack direction="column" spacing={1}>
            <h6>College Email</h6>
            <TextField
              required
              name="college_email"
              value={formValue.college_email}
              onChange={handleInputChange}
              error={!!errors.college_email}
              helperText={errors.college_email}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <h6>Password</h6>
            <TextField
              required
              name="password"
              value={formValue.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              required
              name="c_password"
              value={formValue.c_password}
              onChange={handleInputChange}
              error={!!errors.c_password}
              helperText={errors.c_password}
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default AccountDetails;
