
import React, { useState } from 'react';

import { Video_upload } from '../../API/api.js';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import VideoView from './VideoView.js';
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { toast,ToastContainer } from "react-toastify";
import {
 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
 
} from "@mui/material";

function VideoUpload() {

    const [file, setFile] = useState(null);
    const [base64File, setBase64File] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(false);





    const handleFileChange = async (e) => {
        const selected = e.target.files[0]; //It gives you the actual File object (metadata + content).

        setError("");
        if (selected) {
            setFile(selected);
            const base64 = await fileToBase64(selected);
            setBase64File(base64);
            console.log("BASE64", base64);

        }

        // reset input so same file can be chosen again
        e.target.value = "";
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {

            const reader = new FileReader(); // It can read files selected via <input type="file">.
            reader.readAsDataURL(file);  //converts the file into a string 
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        }

        );
    };

    const handleUpload = async () => {

        if (!base64File || !file) {
            alert("Please Select a File");
            return;
        }

        setUploading(true);
        setError("");


        try {


            const sendFileRes = await Video_upload(file.name, base64File);
            console.log(sendFileRes);

            if (sendFileRes.success) {

                toast.success("Video Uploaded Successfully");
                console.log(sendFileRes.message);

                // reset input
                setFile(null);
                setBase64File("");
                setMessage(true);
                setTimeout(() => setMessage(false), 3000);

                // refresh right table
                setRefresh((r) => !r);
            }
            else {
                setError(sendFileRes.message);
                toast.error(sendFileRes.message);
            }
        } catch (err) {

            setError("Something went wrong during upload.");
            setTimeout(() => setError(""), 3000);
            setFile(null);

        } finally {
            setTimeout(() => setError(""), 3000);
             setTimeout(() => 
        setFile(null),3000
      );
            setTimeout(() => {
                setUploading(false);
            }
                , 1000);



        }
    };


    return (
<Box>
         <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "#3f51b5",
                      mb: 1,
                      ml: 20,
                    }}
                  >
                    UPLOAD VIDEOS
                  </Typography>

        <Box sx={{ Width: "100%", display: "flex", gap: "50px", padding: "5px" }}>

            
            <ToastContainer position="top-right" autoClose={2000} />
            <Box
                sx={{
                    position: "relative",
                    width: "400px",
                    height: "400px",

                    textAlign: "center",
                    padding: 10,
                    border: "2px dashed #ddd",
                    borderRadius: 8,
                    backgroundColor: "white",
                    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)',

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        backgroundImage: "url('/Images/2965385.jpg')",
                        opacity: 0.1,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: 8,
                    }}
                >

                </Box>

                <input
                    accept="video/*"
                    style={{ display: "none", }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}

                />

                <label htmlFor="raised-button-file">
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<VideoFileIcon />}
                        sx={{ marginBottom: 2 }}
                        disabled={uploading}
                    >
                        Choose File
                    </Button>
                </label>


                {/* Show selected file name */}

                {/* Show selected file or error */}
                {error ? (
                    <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>
                ) : file ? (
                    <Typography sx={{ color: "green", mb: 2 }}>
                        Selected File: <b>{file.name}</b>
                    </Typography>
                ) : null}


                {message && (<Typography sx={{ color: "green", mb: 2 }}>File Uploaded SuccessFully</Typography>)}



                {/* Upload Button */}
                <Button

                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    fullWidth
                    disabled={uploading || !file}
                >
                    {uploading ? <CircularProgress size={24} color="primary" /> : "Upload"}
                </Button>

            </Box>

            <Box sx={{width:"50%"}}>
                <VideoView refresh={refresh}/>
            </Box>
        </Box>
        </Box>


    );


}

export default VideoUpload