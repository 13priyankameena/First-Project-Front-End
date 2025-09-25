import Cookies from "js-cookie";
import { get } from "mongoose";

const BASE_URL = process.env.REACT_APP_BASE_URL;



// We’ll use js-cookie for reading cookies and pass the token in the Authorization header.

// Helper function to get headers with token
const getAuthHeader = () =>{

const Token=Cookies.get("token");   //read token from cookies

return{
        "Content-Type" : "application/json",
        Authorization:Token ? `Bearer ${Token}` : "",       //Bearer is like a label that tells the server:
                                                            //"Hey, I’m sending a token, not a password or something else."
};

};


//LOGIN API

export const LOGIN_API = async(username,password) => {

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
    const res = await fetch(`${BASE_URL}chartDB/chartdatas`,{
      method: "GET",
      headers:getAuthHeader(),
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
     console.error(" Create Form Error:",err);
     throw err;
  }
}    

//FETCH FORM DATA FOR TABLE

export const FetchFormData = async () => {
    try {
        const res = await fetch(`${BASE_URL}chartDB/forms`,{
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
export const SIGNUP_API = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}chartDB/logins/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    return await response.json(); // API response
  } catch (err) {
    console.error("Error in SIGNUP_API:", err);
    return { success: false, message: "Network error" };
  }
};


//fetch data f0r  table.js

export const Students_tble = async() =>{
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

export const Employees_tble = async() =>{
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
