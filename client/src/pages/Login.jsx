import React, { useState } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [snackNarContent, setSnackBarContent] = useState(null)

  const navigate = useNavigate()

  const initInput = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initInput);

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
    })
    .then((res) => {
      console.log(`User ${res.data.data.name} logged in!`)
      localStorage.setItem('username', res.data.data.name)
      localStorage.setItem('userId', res.data.data._id)
      navigate('/')
    })
    .catch((error) => {
      console.log(error)
      setSnackBarContent("Some errors happened")
    })
  };

  const register = () => {
    Axios({
      method: "POST",
      data: {
        name: values.username,
        password: values.password,
      },
      withCredentials: true,
      url: "http://localhost:4000/api/user",
    })
    .then((res) => {
      console.log(`User ${res.data.data.name} created!`)
    })
    .catch((error) => {
      console.log(error)
      setSnackBarContent("Some errors happened (Maybe username duplicated)")
    })
  }

  const errors = {
    uname: "Invalid Username",
    pass: "Invalid Password",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      register();
    } else {
      login();
    }
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
        {isRegister ? 'Register' : 'Sign in'}
      </Button>
    </Box>
  );
  const successfulLogin = <Navigate to="/home" />;

  return (
    <div className="log-in-page">
      <div className="login-form">
        <div className="title">{isRegister ? 'Register' : 'Sign in'}</div>
        {isSubmitted ? successfulLogin : renderForm}
        <Button onClick={() => {
          setIsRegister(!isRegister)
        }}>{isRegister ? 'Sign in' : 'Register'}</Button>
      </div>
      <Snackbar
        open={snackNarContent !== null}
        autoHideDuration={6000}
        onClose={() => {
          setSnackBarContent(null)
        }}
        message={snackNarContent}
      />
    </div>
  );
}
