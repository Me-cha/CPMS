import { Avatar, Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { useDispatch } from "react-redux";
import { addCoordinator } from "../../../../redux/action/coordinatorControls";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoordinatorPopUp = ({ addEmails, setAddEmails }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setAddEmails((prevEmails) => [...prevEmails, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (email) => {
    setAddEmails((prevEmails) => prevEmails.filter((item) => item !== email));
  };

  const handleAddCoordinator = async () => {
    let response;
    if (addEmails.length === 0) {
      toast.error("Please Enter Email");
    } else {
      response = await dispatch(addCoordinator(addEmails));
    }
    if (response && response.status == 200) {
      toast.success("Invitation sent!");
      setAddEmails([]);
    } else {
      toast.error("Try sending invitation Again!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Popup
        trigger={
          <Button
            variant="outlined"
            size="small"
            style={{ fontWeight: "bold" }}
          >
            ADD Coordinator
          </Button>
        }
        position="right center"
        modal
        nested
      >
        {(close) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw",
              backdropFilter: "blur(5px)",
            }}
          >
            <div
              style={{
                minHeight: "30vh",
                width: "30vw",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "1vh 1vw",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={close}
                style={{
                  width: "fit-content",
                  alignSelf: "flex-end",
                  marginBottom: "2vh ",
                }}
              >
                X
              </Button>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="Add Coordinator Email"
                  placeholder="Enter Email"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  style={{ marginBottom: "2vh" }}
                />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {addEmails.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      variant="outlined"
                      onDelete={() => handleDelete(option)}
                      avatar={<Avatar>{option[0].toUpperCase()}</Avatar>}
                    />
                  ))}
                </Stack>
                <Button
                  variant="contained"
                  fullWidth
                  style={{ width: "28vw" }}
                  onClick={handleAddCoordinator}
                >
                  Send invitation
                </Button>
              </Stack>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default AddCoordinatorPopUp;
