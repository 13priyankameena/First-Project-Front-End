import React from 'react';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import { SIGNUP_API } from '../../API/api.js';

import { useNavigate } from "react-router-dom";


function SignUp() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const[email,setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState({});
  const [passwordError, setPasswordError] = useState(false);
  const [apiMessage, setApiMessage] = useState(""); // to show success/error
  const [isSuccess,setIsSuccess] =useState(false);

 useEffect(() => {
        document.title = "Sign Up";
    }, []);

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    let errorCopy = { ...Error }
    if (!value)
      errorCopy.username = "Username Required";

    else {
      delete errorCopy.username;
    }
    setError(errorCopy);
  }

  const handleEmailChange = (e) =>{
    const value = e.target.value;
    setEmail(value);

    let errorCopy ={...Error}
    if(!value)
      errorCopy.email = "Email Required";
    else{
      delete errorCopy.email;
    }
    setError(errorCopy);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    let errorCopy = { ...Error }
    if (!value)
      errorCopy.password = "password";
    else {
      delete errorCopy.password
    }
    setError(errorCopy);
  }

 const handlePasswordChangeBlur = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

     if (!username || !password || password !== confirmPassword || !email) {
    setPasswordError(password !== confirmPassword);
    setApiMessage("Please fix the errors above");
    return;
  }

 const data = await SIGNUP_API(username, password, email);

    if (data.success) {
      setApiMessage("User registered successfully");
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } else {

      setApiMessage(data.message || "Signup failed");
      setIsSuccess(false);
    }
  };



 



  return (
    <Box sx={{ width: 450, m: "auto", marginTop: 5, padding: 8, boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.3)", display: 'flex', borderRadius: 5 }}>

      {/* Username Box */}
      <Box sx={{ m: "auto" }}>
        <Typography><h3>Sign Up</h3></Typography><br></br><br></br>

        <TextField id="tf1"
          label="Enter Username" variant="standard" sx={{ width: 300 }} value={username}
          onChange={handleUserNameChange} /><br></br>

        {Error.username && <p style={{ color: "red" }}>{Error.username}</p>}

        <TextField label="Enter Email" id="td2" variant='standard'  sx={{ width: 300 }} value={email} type='email'
        onChange={handleEmailChange}><br></br><br></br>

        {Error.email && <p style={{ color: "red" }}>{Error.email}</p>}

        </TextField>

        <TextField id="tf3"
          label="Enter Password" variant="standard" sx={{ width: 300 }} value={password}
          onChange={handlePasswordChange} type='password'/><br></br>

        {Error.password && <p style={{ color: "red" }}>{Error.password}</p>}


        <TextField id="tf4"
          label="Confirm Password" variant="standard" sx={{ width: 300 }} value={confirmPassword} type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handlePasswordChangeBlur}
          error={passwordError} // show red border
          helperText={passwordError ? "Password do not match" : ""} /><br></br><br></br>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: 300, }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </Button>

        {/* API Response Message */}
        {apiMessage && (
          <Typography sx={{ marginTop: 2, color: isSuccess ? "green" : "red" }}>
  {apiMessage}
</Typography>
        )}

      </Box>




    </Box>

  )
}

export default SignUp