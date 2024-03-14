import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { coSignupAction } from "../../redux/action/auth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  Card,
  Stack,
  TextField,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";

export default function CoSignUp() {
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    uid: "",
    branch: "",
    contact: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [errors, setErrors] = useState(formValue);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    // Check if field is filled
    if (!value) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Check if passwords match
    if (name === "c_password" && value !== formValue.password) {
      setErrors((prev) => ({ ...prev, c_password: "Passwords do not match" }));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Define the fields required for each step
    const requiredFields = [
      "name",
      "contact",
      "branch",
      "email",
      "uid",
      "password",
      "c_password",
    ];

    // Check if all required fields for the current step are filled
    const isStepComplete = (fields) =>
      fields.every((field) => Boolean(formValue[field]));

    if (!isStepComplete(requiredFields)) {
      toast.error("Please fill all the fields.");
    } else {
      const result = await dispatch(coSignupAction(formValue));

      if (result === 200) {
        setFormValue({
          name: "",
          uid: "",
          branch: "",
          contact: "",
          email: "",
          password: "",
          c_password: "",
        });
        toast.success("Account created successfully!");
        setSignUpSuccess(true);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return !signUpSuccess ? (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        padding: "5vh 5vw",
        backgroundColor: "#2be2b97d",
      }}
    >
      <Typography
        sx={{
          mb: 1,
          fontSize: 50,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Welcome, Please Create Your Co-ordinator Account
      </Typography>
      <div className="SignupForm">
        <Card
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "3vh 1vw 1vh",
            margin: "3vh auto",
            width: "60vw",
            height: "78vh",
          }}
        >
          <Stack direction="column" spacing={4} my={1}>
            <Stack direction="column" spacing={1}>
              <h6>Full Name</h6>
              <TextField
                required
                name="name"
                value={formValue.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
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
                <h6>Branch</h6>
                <TextField
                  name="branch"
                  value={formValue.branch}
                  onChange={handleInputChange}
                  error={!!errors.branch}
                  helperText={errors.branch}
                />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Contact</h6>

                <TextField
                  required
                  name="contact"
                  value={formValue.contact}
                  onChange={handleInputChange}
                  error={!!errors.contact}
                  helperText={errors.contact}
                />
              </Stack>
            </Stack>

            <Stack direction="column" spacing={1}>
              <h6>College Email</h6>
              <TextField
                required
                name="email"
                value={formValue.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <h6>Password</h6>
              <Stack direction="row" spacing={1}>
                <Stack direction="column" spacing={1}>
                  <TextField
                    required
                    name="password"
                    placeholder="Password"
                    value={formValue.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField
                    required
                    name="c_password"
                    placeholder=" Confirm Password"
                    value={formValue.c_password}
                    onChange={handleInputChange}
                    error={!!errors.c_password}
                    helperText={errors.c_password}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <div
            style={{
              position: "absolute",
              bottom: "7vh",
              margin: "0vh 26vw",
            }}
          >
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Card>
        <ToastContainer />
      </div>
    </Box>
  ) : (
    <Box>
      <Typography
        sx={{
          mb: 1,
          fontSize: 40,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Your Account is Created Successfully,
        <br /> Please login through College Placement Portal
      </Typography>
      <Stack direction="row" style={{ margin: "0vh 38vw" }}>
        <Button onClick={() => navigate("/")} size="large">
          Click
        </Button>
        <div style={{ fontSize: "19px", marginTop: "0.6vh" }}>
          to get navigated to Login Page
        </div>
      </Stack>
    </Box>
  );
}
