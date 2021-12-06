import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
export default function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const userDatabase = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
    {
      username: "admin",
      password: "admin",
    },
  ];
  const theme = createTheme();
  const errors = {
    uname: "Invalid Username",
    pass: "Invalid Password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = userDatabase.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
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
        {renderErrorMessage("uname")}

        <TextField
          margin="normal"
          required
          fullWidth
          name="pass"
          label="Password"
          type="password"
        />
        {renderErrorMessage("pass")}
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
