import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import axios from "axios";

export default function LoginAuth() {
  const theme = createTheme();

  const [user, setUser] = useState();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
  const handleSubmit = async (e) => {
    //Prevent page reload
    e.preventDefault();
    // hard code for now
    const username = "tongyun";
    const password = "password";

    const user = { username, password };
    // send the username and password to the server
    console.log(`client side name ${username} pw ${password}`);
    const response = await axios({
      method: "post",
      data: {
        name: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/auth",
    });
    // set the state of the user
    setUser(response.data);
    // store the user in localStorage
    localStorage.setItem("user", response.data);
    console.log(response.data);
  };

  // error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // login form
  const renderForm = (
    // <ThemeProvider theme={theme}>
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <div className="input-container">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          name="uname"
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="pass"
          label="Password"
          type="password"
        />
      </div>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
    // </ThemeProvider>
  );
  const successfulLogin = <Navigate to="/home" />;

  return (
    <div className="log-in-page">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? successfulLogin : renderForm}
      </div>
    </div>
  );
}
