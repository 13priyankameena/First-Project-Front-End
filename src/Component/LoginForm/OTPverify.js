import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
// import './LoginStylesheet.css';
import {
  Button, Box
} from "@mui/material";
import { checkotp } from '../../API/api.js';
import { useNavigate, useLocation } from "react-router-dom";  //useLocation - gives info about the current URL and state
import Cookies from "js-cookie";



export default function OTPform({ }) {

  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const location = useLocation();
  const username = location.state?.username  // get from navigation state

  const handleVerify = async () => {
    //  const username = "priyanka";
    if (!username) {
      console.error("Username not found. Cannot verify OTP.");
      return;
    }

    console.log("Entered OTP", otp);

    try {
      const response = await checkotp(username, otp);
      if (response.success && response.token) {
        Cookies.set("token", response.token);

        console.log("Token Saved", response.token);

        navigate("/Dashboard");
      }

      else {
        console.error("OTP verification failed:", response.message);
        alert(response.message);
        navigate("/");
      }
    } catch (err) {
      console.error("Error verifying OTP", err);
    }
  }

  return (

    <Box sx={{
      
      // width: "400px",
      // backgroundColor: "#1976d2",
      margin: "auto",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      height: "100vh",
      
    }}
    >
      <div
        style={{
          textAlign: "center",
          // marginTop: "30px",
          padding: "20px",
          paddingTop:"40px",
          // backgroundColor: "#f8f8f8",
          backgroundColor: "#1976d2",
          borderRadius: "10px",
          width: "fit-content",
          height:"200px"



        }}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "3rem",
            height: "3rem",
            margin: "0 4px",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: "2px solid #1976d2",
            // backgroundColor: "#fff",
            textAlign: "center",
            color: "#1976d2",
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="Primary"
          sx={{
            mt: 2,
            backgroundColor: "white",
            color: "#1976d2"
          }}
          type="submit"
          onClick={handleVerify}


        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
