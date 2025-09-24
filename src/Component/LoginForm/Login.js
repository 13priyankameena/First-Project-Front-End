import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginStylesheet.css';
import { FaUser,FaLock } from "react-icons/fa";
import { LOGIN_API } from '../../API/api.js';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";


export const Login = () => {

  const[username,setname]=useState("");
  const[password,setpassword]=useState("");
  const [Error, setError] = useState({});
  const navigate=useNavigate();

   useEffect(() => {
          document.title = "Login Page";
      }, []);
  

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
      const data = await LOGIN_API(username, password);
      if (data.token) {

        Cookies.set("token",data.token,{expires : 1});

        console.log("Token Saved",data.token);


        navigate("/Dashboard");
      } else {
        setError({ password: "Invalid Username or Password" });
      }
    } catch (err) {
       console.error("Error:", err);
      setError({ password: "Something went wrong!" });
    }
  };

    


    
    

  return (
    <div className='wrapper'>

        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
            <input type="text" placeholder='Username' value={username}  
            onChange={handleUserNameChange}></input><FaUser className='icon' />
            </div>
            

            {Error.username && <p style={{color:"red"}}>{Error.username}</p>}

            <div className="input-box">
            <input type="password" placeholder='Password'  value={password}
             onChange={handlePasswordChange}></input><FaLock className='icon' />
            </div>


               {Error.password && <p style={{color:"red"}}>{Error.password}</p>}

            <div className='remember-forgot'>
                <label><input type="checkbox"></input>Remember me</label>
                <a href="#">Forgot Password</a>
            </div>
            <button type="submit">Login</button>
           
            <div className='signup'>
               <label>Don't have you an account ? </label>
              <Link to="/SignUp">Sign Up</Link>
            </div>
            
            
        </form>

    </div>
  )
}

