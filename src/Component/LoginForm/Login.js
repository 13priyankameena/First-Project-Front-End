import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginStylesheet.css';
import { FaUser,FaLock } from "react-icons/fa";



export const Login = () => {

  const[username,setname]=useState("");
  const[password,setpassword]=useState("");
  const [Error, setError] = useState({});
  const navigate=useNavigate();

  const handleUserNameChange = (e) =>
  {
    const value=e.target.value;
    setname(value);

    let errorcopy={...Error};
    if(!value)
      errorcopy.username="Username required";
    else
    {
      delete errorcopy.username;//remove error when user type
    }
    setError(errorcopy);
  }


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setpassword(value);

    let errorCopy = { ...Error };
    if (!value) {
      errorCopy.password = "Password is required";
    } else {
      delete errorCopy.password;
    }
    setError(errorCopy);
  }


  const handleSubmit = async (e) => {
  
    e.preventDefault();


try {
    const response = await fetch("http://localhost:8000/chartDB/logins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password }),
    });

    console.log("Sending:", { username, password });


    const data = await response.json();

    if (data.success) {
      navigate("/Profile");
    } else {
      setError({ password: "Invalid Username or Password" });
    }
  } catch (err) {
    console.error("Error:", err);
    setError({ password: "Something went wrong!" });
  }
};


    // let error={};

    // if(!Username)
    // {
    //   error.Username="Username is required";
    // }
    // if(!password)
    // {
    //   error.password="Password is required";
    // }
    
    // else 
    //   {
    //           if(Username && Username!=="priyanka")
    //                {
    //                    error.Username="Invalid Username";
      
    //                }
    //          if(password && password!=="priyanka")
    //               {
    //                    error.password="Invalid Password";
      
    //               }
    //  }
    //  if(Username==="priyanka" && password==="priyanka")
    // {
    //   navigate("./Profile");
    // }
     
    //  setError(error);
    // }

    

  return (
    <div className='wrapper'>

        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
            <input type="text" placeholder='Username' value={username}  onChange={handleUserNameChange}></input><FaUser className='icon' />
            </div>
            

            {Error.Username && <p style={{color:"red"}}>{Error.Username}</p>}

            <div className="input-box">
            <input type="password" placeholder='Password'  value={password} onChange={handlePasswordChange}></input><FaLock className='icon' />
            </div>


               {Error.password && <p style={{color:"red"}}>{Error.password}</p>}

            <div className='remember-forgot'>
                <label><input type="checkbox"></input>Remember me</label>
                <a href="#">Forgot Password</a>
            </div>
            <button type="submit">Login</button>
            
        </form>

    </div>
  )
}

