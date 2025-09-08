import React from 'react';
import { Link } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { RxComponent2 } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa6";
import { LiaTableSolid } from "react-icons/lia";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbTypography, TbFavicon } from "react-icons/tb";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

 
function LeftSidebar() {
  return (

    <Box
      sx={{
        width: "20%",
        
        minHeight: "700px",
        bgcolor: "white",
      }}
    >



<List   

sx={{
          display:"flex",
          flexDirection:'column',
          gap:2,
          "& .MuiListItemText-primary": {
            color: "rgb(105, 107, 121)",
            fontSize: "18px",
            fontWeight: 500,
            
          },
        }}



>
        {/* Dashboard */}
        <ListItemButton component={Link} to="/Dashboard">
          <ListItemIcon>
            <RiDashboard3Line size={20} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" 
          />
        </ListItemButton>

        {/* Forms */}
        <ListItemButton component={Link} to="/Forms">
          <ListItemIcon>
            <FaWpforms size={20} />
          </ListItemIcon>
          <ListItemText primary="Forms" />
        </ListItemButton>

        {/* Table */}
        <ListItemButton component={Link} to="/Table">
          <ListItemIcon>
            <LiaTableSolid size={20} />
          </ListItemIcon>
          <ListItemText primary="Table" />
        </ListItemButton>

        
      </List>
    



    </Box>

    
      //   {/* <section className="leftcontainer">
                    
      //             <div className="leftcont2">
      //               <nav>
        
      //                 <div className="Profilelink"><RiDashboard3Line /><Link to="/Dashboard">Dashboard</Link></div>
      //                 <div className="Profilelink"><RxComponent2 /><Link to="/Component">Components</Link></div>
      //                 <div className="Profilelink"><FaWpforms /><Link to="/Forms">Forms</Link></div>
      //                 <div className="Profilelink"><LiaTableSolid /><Link to="/Table">Table</Link></div>
      //                 <div className="Profilelink"><IoIosNotificationsOutline /><Link to="/Notification">Notification</Link></div>
      //                 <div className="Profilelink"><TbTypography /><Link to="/Typography">Typography</Link></div>
      //                 <div className="Profilelink"><TbFavicon /><Link to="/Icons">Icons</Link></div>
      //               </nav>
      //             </div>
      //           </section>
      // */}
    
  );
}
 
export default LeftSidebar;