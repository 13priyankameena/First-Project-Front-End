import Cookies from "js-cookie";
import { get } from "mongoose";

const BASE_URL = process.env.REACT_APP_BASE_URL;



// We’ll use js-cookie for reading cookies and pass the token in the Authorization header.

// Helper function to get headers with token
const getAuthHeader = () => {

  const Token = Cookies.get("token");   //read token from cookies

  return {
    "Content-Type": "application/json",
    Authorization: Token ? `Bearer ${Token}` : "",       //Bearer is like a label that tells the server:
    //"Hey, I’m sending a token, not a password or something else."
  };

};


//LOGIN API

export const LOGIN_API = async (username, password) => {

  try {

    const res = await fetch(`${BASE_URL}chartDB/logins`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),

    });


    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Login API Error:", err);
    throw err;
  }
};

//DASHBOARD API -FETCH CHART DATA

export const FetchChartData = async () => {
  try {
    const res = await fetch(`${BASE_URL}chartDB/chartdatas`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch Chart Data Error:", err);
    throw err;
  }
};

//FORMS API - SEND FORM DATA


export const CreateForm = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}chartDB/forms/create`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (err) {
    console.error(" Create Form Error:", err);
    throw err;
  }
}

//FETCH FORM DATA FOR TABLE

export const FetchFormData = async () => {
  try {
    const res = await fetch(`${BASE_URL}chartDB/forms`, {
      method: "Get",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.error("Fetch Chart Data Error:", err);
    throw err;
  }
};


// api.js
export const SIGNUP_API = async (username, password, email) => {
  try {
    const response = await fetch(`${BASE_URL}chartDB/logins/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    return await response.json(); // API response
  } catch (err) {
    console.error("Error in SIGNUP_API:", err);
    return { success: false, message: "Network error" };
  }
};


//fetch data f0r  table.js

export const Students_tble = async () => {
  try {
    const res = await fetch(`${BASE_URL}chartDB/students`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Chart Data Error:", error);
  }
};

//  fetch data for table.js

export const Employees_tble = async () => {
  try {
    const res = await fetch(`${BASE_URL}chartDB/employees`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Chart Data Error:", error);
  }
};


//for verify sending ENTERED OTP

export const checkotp = async (username, otp) => {
  try {
    const res = await fetch(`${BASE_URL}verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username:username, otp:otp }),

    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("OTP ERROR:", err);
    throw err;
  }


}

//for sending otp to EMAIL

export const sendOTP = async (username) => {
  try {
    const res = await fetch(`${BASE_URL}send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username:username }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    throw err;
  }
};


//for sending File Uploaded by FlieUploader

export const File_upload = async(FileName,Base64File) =>{
  try {
    const res = await fetch(`${BASE_URL}chartDB/files/create`,{
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({FileName,Base64File}),
      
    });
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("Problem in File Uploading",error);
    throw error;
  }
};

//for taking File in FileDownload

export const File_download = async() => {
  try {
    
    const res = await fetch(`${BASE_URL}chartDB/files`,{
      method: "GET",
      headers:getAuthHeader(),
      
    });

    const data = await res.json(); //Converts the response body from backend into JavaScript object/array.
    return data;

  } catch (error) {
    console.log("Error in File",error.message);
    
  }
}




//for deleting File

export const File_delete = async(id) => {
  try {
    const res = await fetch(`${BASE_URL}chartDB/files/${id}`,{
      method: "DELETE",
      headers:getAuthHeader(),
      body: JSON.stringify({id}),
    });
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("Error in Deleting File",error);
    throw error;
  }
}


//For Uploading Video In VideoUpload.js

export const Video_upload = async(FileName,Base64File) =>{

  try {
     const res = await fetch(`${BASE_URL}chartDB/videos/create`,{
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({FileName,Base64File}),
      
    });
    const data = await res.json();
    return data;
  } catch (error) {
     console.error("Problem in VideoFile Uploading",error);
    throw error;
  }
}


//for Viewing Video in VideoView.js

export const Video_view = async() => {
  try {
      const res = await fetch(`${BASE_URL}chartDB/videos`,{
        method: "GET",
        headers:getAuthHeader(),

      });

      return await res.json();
  } catch (error) {
    console.error("Problem in VideoFile Viewing",error);
    throw error;
  }
}

//for deleting video

export const Video_delete = async(id) => {
  try {
    const res = await fetch(`${BASE_URL}chartDB/videos/${id}`,{
      method: "DELETE",
      headers:getAuthHeader(),
      body:JSON.stringify({id}),
    })
    return await res.json();
    
  } catch (error) {
    console.error("Error in Deleting Video",error);
    throw error;
  }
}