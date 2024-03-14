import React, { useContext, useState } from "react";
import "./PersonalDetails.css";
import Box from "@mui/material/Box";
import {
  Card,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Country, State, City } from "country-state-city";

const PersonalDetails = ({ formValue, errors, handleInputChange }) => {
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
      <Stack direction="row" spacing={4}>
        <Card
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5vh 2vw",
          }}
        >
          <Stack direction="column" spacing={4}>
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

            <Stack direction="column" spacing={1}>
              <FormControl error={!!errors.gender} sx={{ m: 1, minWidth: 200 }}>
                <h6>Gender</h6>
                <Select
                  required
                  name="gender"
                  value={formValue.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
              </FormControl>
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
        </Card>
        <Card
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5vh 2vw",
          }}
        >
          <Stack direction="column" spacing={4}>
            <Stack direction="column" spacing={1}>
              <h6>Address</h6>
              <TextField
                required
                name="address"
                value={formValue.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Stack>{" "}
            <Stack direction="row" spacing={4}>
              <Stack direction="column" spacing={1}>
                <FormControl
                  error={!!errors.country}
                  sx={{ m: 1, minWidth: 200 }}
                >
                  <h6>Country</h6>
                  <Select
                    required
                    name="country"
                    value={formValue.country}
                    onChange={handleInputChange}
                  >
                    {Country.getAllCountries(formValue.country).map(
                      (country) => (
                        <MenuItem key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.country && (
                    <FormHelperText>{errors.country}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack direction="column" spacing={1}>
                <FormControl
                  error={!!errors.state}
                  sx={{ m: 1, minWidth: 200 }}
                >
                  <h6>State</h6>
                  <Select
                    required
                    name="state"
                    value={formValue.state}
                    onChange={handleInputChange}
                  >
                    {State.getStatesOfCountry(formValue.country).map(
                      (state) => (
                        <MenuItem key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.state && (
                    <FormHelperText>{errors.state}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Stack direction="column" spacing={1}>
                <FormControl error={!!errors.city} sx={{ m: 1, minWidth: 200 }}>
                  <h6>City</h6>
                  <Select
                    required
                    name="city"
                    value={formValue.city}
                    onChange={handleInputChange}
                  >
                    {City.getCitiesOfState(
                      formValue.country,
                      formValue.state
                    ).map((city) => (
                      <MenuItem key={city.name} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && (
                    <FormHelperText>{errors.city}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack direction="column" spacing={1}>
                <h6>Post Code</h6>
                <TextField
                  required
                  name="post_code"
                  value={formValue.post_code}
                  onChange={handleInputChange}
                  error={!!errors.post_code}
                  helperText={errors.post_code}
                />
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default PersonalDetails;
