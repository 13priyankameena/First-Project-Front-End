import React from 'react';
import { Link } from "react-router-dom";
import TableChartIcon from "@mui/icons-material/TableChart";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
           
               <DashboardIcon color="primary" sx={{fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" 
          />
        </ListItemButton>

        {/* Forms */}
        <ListItemButton component={Link} to="/Forms">
          <ListItemIcon>
           <AssignmentIcon color="primary" sx={{ fontSize: 20 }}/>
          </ListItemIcon>
          <ListItemText primary="Forms" />
        </ListItemButton>

        {/* Table */}
        <ListItemButton component={Link} to="/Table">
          <ListItemIcon>
            <TableChartIcon color="primary" sx={{ fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText primary="Table" />
        </ListItemButton>


        {/*FileUpload */}
        <ListItemButton component={Link} to="/FileUpload">
        <ListItemIcon>
        <UploadFileIcon color="primary" sx={{ fontSize: 20 }} />
        </ListItemIcon>
        <ListItemText primary="File Upload"/>
        </ListItemButton>
        

        {/* VideoUpload */}
        <ListItemButton component={Link} to="/VideoUpload">
          <ListItemIcon>
        <VideoFileIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Video Upload"/>
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