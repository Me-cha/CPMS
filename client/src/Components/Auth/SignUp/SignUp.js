import React, { useState } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthHeader from "./AuthHeader/AuthHeader";
import { signupAction } from "../../../redux/action/auth";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import AcademicDetails from "./AcademicDetails/AcademicDetails";
import Links from "./Links/Link";
import AccountDetails from "./AccountDetails/AccountDetails";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const steps = [
  "Account Setup",
  "Personal Information",
  "Academic Background",
  "Additional Links",
];

export default function SignUp({ isDarkMode, toggleDarkMode }) {
  const [formValue, setFormValue] = useState({
    name: "",
    uid: "",
    batch: "",
    branch: "",
    gender: "",
    contact: "",
    college_email: "",
    degree: "",
    avg_cgpa: "",
    ssc_marks: "",
    ssc_board: "",
    hsc_marks: "",
    hsc_board: "",
    address: "",
    city: "",
    post_code: "",
    state: "",
    country: "",
    linkedln_link: "",
    resume_url: "",
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

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    dispatch(signupAction(formValue, navigate));
  };

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    // Define the fields required for each step
    const requiredFields = [
      ["uid", "password", "c_password"], // Account Setup
      [
        "name",
        "gender",
        "contact",
        "address",
        "city",
        "post_code",
        "state",
        "country",
      ], // Personal Information
      [
        "batch",
        "branch",
        "college_email",
        "degree",
        "avg_cgpa",
        "ssc_marks",
        "ssc_board",
        "hsc_marks",
        "hsc_board",
      ], // Academic Background
      ["linkedln_link", "resume_url"], // Additional Links
    ];

    // Check if all required fields for the current step are filled
    const isStepComplete = requiredFields[activeStep].every(
      (field) => formValue[field]
    );

    if (isStepComplete) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      // Show a toast message if the step is not complete
      toast.error(
        "Please fill all the required fields before moving to the next step."
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <div>
        <AuthHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <Stepper
        activeStep={activeStep}
        style={{
          padding: "2vh 3vw",
          backgroundColor: "#23073b45",
        }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - Submit the form
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        //Step {activeStep + 1}
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>Next</Button>
          </Box>
          <Typography
            sx={{
              mb: 1,
              fontSize: 35,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {steps[activeStep]}
          </Typography>
          <div className="SignupForm">
            {activeStep === 0 && (
              <AccountDetails
                formValue={formValue}
                errors={errors}
                handleInputChange={handleInputChange}
              />
            )}
            {activeStep === 1 && (
              <PersonalDetails
                formValue={formValue}
                errors={errors}
                handleInputChange={handleInputChange}
              />
            )}
            {activeStep === 2 && (
              <AcademicDetails
                formValue={formValue}
                errors={errors}
                handleInputChange={handleInputChange}
              />
            )}
            {activeStep === 3 && (
              <Links
                formValue={formValue}
                errors={errors}
                handleInputChange={handleInputChange}
              />
            )}
            <ToastContainer />
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
