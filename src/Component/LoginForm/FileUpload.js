import React, { useState }  from 'react'
import { Button, Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Cookies from "js-cookie";
import { File_upload } from '../../API/api.js';
import FileDownload from './FileDownload.js';
  


function FileBase64Upload() {

  const [file, setFile] = useState(null);   
  const [base64File, setBase64File] = useState("");
  const [refresh, setRefresh] = useState(false);


//handle file System

const handleFileChange = async(e) =>{
    const selected = e.target.files[0]; //It gives you the actual File object (metadata + content).
    if(selected)
    {
        setFile(selected);
        const base64 = await fileToBase64(selected);
        setBase64File(base64);
        console.log("BASE64",base64);

    }
};

const fileToBase64 = (file) =>{
    return new Promise((resolve,reject) =>{

        const reader = new FileReader(); // It can read files selected via <input type="file">.
        reader.readAsDataURL(file);  //converts the file into a string 
        reader.onload = () =>resolve(reader.result);
        reader.onerror =(error) =>reject(error);
    }
    
    );
};


const handleUpload = async() =>{

if(!base64File || !file)
{
    alert("Please Select a File");
     return;
}

const sendFileRes = await File_upload(file.name,base64File);
    console.log(sendFileRes);
    if(sendFileRes.success)
    {
        console.log("File Uploaded successfully");
        // refresh right table
                setRefresh((r) => !r);
    }

};



  return (

<Box sx={{Width:"100%",backgroundColor:"white", display:"flex",gap:"10px",padding:"5px"}}>

    <Box sx={{width:"300px",maxHeight:"400px",
     margin:"20px",
     textAlign:"center", 
     padding:4,
     border:"2px dashed #ddd",
     borderRadius: 8,
     backgroundColor:"white",
     boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',
     }}>


       <Typography variant="h6" gutterBottom>
        Upload a File
      </Typography>

       {/* Hidden input + styled button */}

      <input
        accept="*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />


      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadFileIcon />}
          sx={{ marginBottom: 2 }}
        >
          Choose File
        </Button>
      </label>


  {/* Show selected file name */}


      {file && (
        <Typography
          variant="body2"
          gutterBottom
          sx={{ marginBottom: 2, color: "green" }}
        >
          Selected File: <b>{file.name}</b>
        </Typography>
      )}

{/* Upload Button */}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        fullWidth
      >
        Upload
      </Button>


    </Box>

{/* Right side --Uploaded File and Download option */}

    <Box sx={{maxWidth:"50%"}}>
        
<FileDownload refresh={refresh}/>
      
    </Box>
    </Box>
   
  )
}

export default FileBase64Upload