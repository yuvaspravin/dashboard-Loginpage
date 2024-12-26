import React, { useEffect } from "react";

import { Box, CssBaseline, Grid, Paper } from "@mui/material";
import loginImage from "../assets/loginPage.png";

import Input from "../components/Input";
import ButtonPage from "../components/ButtonPage";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  setLoading,
  setLoginData,
  setUserData,
} from "../redux/action/action";
import { useNavigate } from "react-router-dom";

import users from "../user.json";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state?.login?.loginData);
  const errors = useSelector((state) => state?.login?.errors);

  console.log(loginData, "loginData");

  const userState = useSelector((state) => state.user.users);

  console.log(userState, "userState");

  // onchange
  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;

    // Only clear the error if the field becomes valid
    if (name === "email" && value) {
      dispatch(
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "", // Clear error if there's any input in the email field
        }))
      );
    }

    if (name === "password" && value) {
      dispatch(
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "", // Clear error if there's any input in the password field
        }))
      );
    }

    // Update loginData in the store
    dispatch(setLoginData({ [name]: value }));
  };

  // Validate the form
  const validateForm = () => {
    const errorObj = {};

    // Add error if email or password are empty
    if (!loginData.email) errorObj.email = "Email is required";
    if (!loginData.password) errorObj.password = "Password is required";

    // Dispatch errors to Redux store
    dispatch(setErrors(errorObj));

    // If the errorObj has no keys, it means validation passed
    return Object.keys(errorObj).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(setLoading(true));
      dispatch(setErrors({})); // Clear errors on successful validation

      // Simulate login request with user details
      const user = userState.find(
        (user) =>
          user.email === loginData.email && user.password === loginData.password
      );
      const userEmail = userState.find(
        (user) => user.email === loginData.email
      );

      const userPassword = userState.filter(
        (user) => user.password === loginData.password
      );
      console.log(userState, "userEmail");

      if (user) {
        // Store user data in localStorage and navigate to dashboard
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
        dispatch(setErrors({})); // Clear errors on success
        console.log("Login successful");
      }
      if (!userEmail) {
        dispatch(setErrors({ email: "Invalid email or password" }));
      } else {
        dispatch(setErrors({ email: "" }));
      }
      if (!userPassword) {
        dispatch(setErrors({ password: "Invalid email or password" }));
      } else {
        dispatch(setErrors({ password: "" }));
      }

      // Simulate loading completion after a delay
    }
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? "#F5F5F5" : "#F5F5F5",
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: "100vh",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: {
                xs: 2,
                sm: 4,
                md: 4,
                lg: 8,
                xl: 12,
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Input
              handleInputFieldChange={handleInputFieldChange}
              loginData={loginData}
              setLoginData={setLoginData}
              errors={errors}
            />
            <ButtonPage name="Login" onClick={handleSubmit} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
