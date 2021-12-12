import React, { useState } from "react";
import Axios from "axios";
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
  const initInput = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initInput);
  const [data, setData] = useState(null);

  // axios
  const login = () => {
    Axios({
      method: "POST",
      data: {
        name: values.username,
        password: values.password,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/auth",
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/api/auth",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const errors = {
    uname: "Invalid Username",
    pass: "Invalid Password",
  };

  const handleClick = (e) => {
    getUser();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  // error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // login form
  const renderForm = (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <div className="input-container">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          name="username"
          value={values.username}
          autoFocus
          onChange={handleChange}
        />
        {renderErrorMessage("uname")}

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          value={values.password}
          label="Password"
          type="password"
          onChange={handleChange}
        />
        {renderErrorMessage("pass")}
      </div>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
  const successfulLogin = <Navigate to="/home" />;

  return (
    <div className="log-in-page">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? successfulLogin : renderForm}
        <Button onClick={handleClick}>Show</Button>
      </div>
    </div>
  );
}
