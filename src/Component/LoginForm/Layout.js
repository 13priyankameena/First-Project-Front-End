import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
// import "./Layout.css";

// import { FaRegHandPointer } from "react-icons/fa";
import LeftSidebar from "./LeftSidebar.js";
import Headers from "./Header.js";

export const Layout = ({ children }) => {
  return (
<>

       <Headers/>

{/* main container */}


       <Box
              sx={{
                       width: "100%", 
                        margin: "auto",
                        display: "flex",
                         minHeight: "100vh", 
                   }}
       >  
      


 {/* Left Sidebar */}
                          <LeftSidebar />


 {/* Right Content */}
      
      
      <Box
               sx={{
                     width: "80%",
                     padding: "20px",
                     bgcolor: "#f5f7fa", // light background
                     minHeight: "700px",
                     
                   }}
      >

      {children}
      
    </Box>
    </Box>
    
     

      {/* <section className="maincontainer">
        
        <LeftSidebar/>
       
        <section className="rightcontainer">
          {children}
        </section>
      </section> */}
    </>
  );
};