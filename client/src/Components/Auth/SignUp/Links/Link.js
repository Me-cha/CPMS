import React, { useContext, useRef, useState } from "react";
import { Box, Card, Stack, TextField } from "@mui/material";

const Links = ({ formValue, handleInputChange }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          margin: "auto",
          width: "50vw",
          height: "60vh",
        },
      }}
    >
      <Card
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5vh 1vw",
        }}
      >
        <Stack direction="column" spacing={4}>
          <Stack direction="column" spacing={1}>
            <h5>LinkedIn Link</h5>
            <TextField
              name="linkedln_link"
              value={formValue.linkedln_link}
              onChange={handleInputChange}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <h5>Resume URL</h5>
            <TextField
              name="resume_url"
              value={formValue.resume_url}
              onChange={handleInputChange}
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default Links;
/*
------------------------------------------------------------------
student: {
        name : {type : String, required: true },
        uid : {  type : String, required : true},
        batch : {type : String,   required: true, },
        branch : { type : String,  required: true },
        gender : {  type : String, required:true,  default : 'M' },
        contact : {  type : String, required: true},
        college_email : { type : String, required: true, },
        degree : { type : String, required: true,  },
       avg_cgpa : { type : String, required: true },
        ssc_marks : {type : String, required: true  },
        ssc_board : { type : String,  required: true,},
        hsc_marks : { type : String, required: true },
        hsc_board : { type : String, required: true,  },
 },

 location: {
    address : {  type : String, required: true },
    city : { type : String,  required: true},
    post_code : {type : String, required: true},
    state : { type : String, required: true,  },
    country : { type : String, required: true },
 },
    
    
    linkedln_link: {
        type : String
    },
    resume_url : {
        type : String
    },
    password : {
        type : String,
        required: true, 
        
    },c_password : {
        type : String,
        required: true, 
        
    },
*/
