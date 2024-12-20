import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  fullWidth = true,
  handleInputFieldChange,

  loginData,
  errors,
  loading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography component="h1" variant="h5" sx={{ mb: "10px" }}>
            Login
          </Typography>
        </Box>
        <Grid container={fullWidth} spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email Address"
              value={loginData.email}
              onChange={handleInputFieldChange}
              error={!!errors.email} // Set error if there's a message in errors.email
              helperText={errors.email} // Show the error message
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={loginData.password}
              onChange={handleInputFieldChange}
              error={!!errors.password}
              helperText={errors.password} // Show the error message
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Input;
