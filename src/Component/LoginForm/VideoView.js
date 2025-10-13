import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import { Video_view, Video_delete } from '../../API/api.js';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
    LinearProgress
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

} from "@mui/material";
import { set } from 'mongoose';

function VideoView({ refresh }) {

    const [videos, setVideos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [circularUpload,setCircularUpload] = useState(true);

const [selectedVideoMimeType, setSelectedVideoMimeType] = useState("");
    //for viewing video in dialog box
    const [openVideoDialog, setOpenVideoDialog] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState("");


    const [playing, setPlaying] = useState(false);

useEffect(() => {
  if (openVideoDialog) {
    setPlaying(false);
  }
}, [openVideoDialog]);

    useEffect(() => {

        const loadVideos = async () => {
            try {
                const loadVideoFiles = await Video_view();
                console.log(loadVideoFiles);

                if (loadVideoFiles.success === true) {
                    setCircularUpload(false);
                    console.log(loadVideoFiles.message);
                    const convertedFiles = loadVideoFiles.data.map((video) => {
                        if (video.Base64File) {

                            // Split Base64 into mime type and data

                            const parts = video.Base64File.split(";base64,");
                            const mimeType = parts[0].split(":")[1];
                            const base64Data = parts[1];

                            console.log(mimeType, base64Data);
                            //Decode Base64 to Binary

                            const byteCharacters = atob(base64Data); //“atob” → ASCII to binary
                            const byteNumbers = new Array(byteCharacters.length);  //creates a new empty array of the same length as the string.

                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i); //returns the numeric Unicode/ASCII code of the character at position i.
                                //Example: "A".charCodeAt(0) → 65
                                //byteNumbers is an array of numbers representing the raw bytes of the file.
                            }
                            const byteArray = new Uint8Array(byteNumbers); //This is exactly the format needed to represent a binary file in memory.

                            // Create Blob and Object URL
                            const blob = new Blob([byteArray], { type: mimeType });//blob behaves like a file in the browser 
                            const fileUrl = URL.createObjectURL(blob);
                            console.log("Generated file URL:", fileUrl);

                            return { ...video, fileUrl, mimeType };


                        }

                        return video;

                    });
                    setVideos(convertedFiles);
                }
            } catch (error) {
                console.log("Error in Loading File", error);
            }
        }
        loadVideos();
    }, [refresh]);



    // Open delete confirmation dialog

    const handleDeleteClick = (_id) => {
        setSelectedRowId(_id);
        setOpenDialog(true);
    };

    // Cancel delete (close dialog)

    const handleCancelDelete = () => {
        setOpenDialog(false);
        setSelectedRowId(null);
    };


    // DELETE HANDLER


    const handleConfirmDelete = async () => {

        const result = await Video_delete(selectedRowId);
        try {
            if (result.success) {
                toast.success("File deleted successfully!");

                // remove deleted file from UI without reloading
                setVideos((prevFiles) => prevFiles.filter((f) => f._id !== selectedRowId));
            }

            else {
                toast.error("Error deleting file!")
            }
        } catch (error) {
            toast.error("Something went wrong while deleting!");

        }
        finally {
            setOpenDialog(false);
            setSelectedRowId(null);
        }




    };

    //video view dilog box


    const handleViewClick = (videoUrl, mimeType) => {
console.log("Viewing video:", videoUrl);
         document.activeElement.blur();
        setSelectedVideoUrl(videoUrl);
        setSelectedVideoMimeType(mimeType);
        setOpenVideoDialog(true);
setTimeout(() => setPlaying(true), 500); // start after open
};

    

    const handleCloseVideoDialog = () => {
         setPlaying(false);
  
         setTimeout(() =>{
            setOpenVideoDialog(false);
            setSelectedVideoUrl("");
        }, 500); // small delay
    };


    return (<>

    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          
          transition: "all 0.3s ease-in-out",
        }}
      >
        {circularUpload ? (
          <>
            
            <LinearProgress
              
              sx={{ width: "30%",mt:20}}
            />
            <Typography sx={{ mt: 1}}>Loading files...</Typography>
          </>
        ) : (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Video Name</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>DELETE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videos.map((video, index) => (
                        <TableRow key={index}>

                            <TableCell>{video.FileName}</TableCell>

                            <TableCell>


                                <Tooltip title="Show Video">
                                    <IconButton
                                        color='primary'
                                        onClick={() => handleViewClick(video.fileUrl,video.mimeType)}>
                                        <PlayCircleOutlineIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>


                                {/* {video.mimeType?.startsWith("video/") ? (
                  <video width="150" height="100" controls>
                    <source src={video.fileUrl} 
                    type={video.mimeType} />
                  </video>
                ) : (
                  <Typography>Not a video file</Typography>
                )} */}
                            </TableCell>

                            <TableCell>
                                <Tooltip title="Delete Video">
                                    <IconButton color="error" onClick={() => handleDeleteClick(video._id)}>
                                        <DeleteForeverRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        )}
        </Box>


        {/* DialogBox for delete confirmation */}

        <Dialog open={openDialog} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this file?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>


        {/* for playing video in Dialog Box */}

        <Dialog
            open={openVideoDialog}
            onClose={handleCloseVideoDialog}
            maxWidth="md"
            fullWidth >

            <DialogTitle>Watch Video</DialogTitle>
            <DialogContent>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    {/* <ReactPlayer url="https://www.w3schools.com/html/mov_bbb.mp4" controls playing /> */}

                    {/* <ReactPlayer
                        url={selectedVideoUrl}
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                        playing={false}
                        muted={true}
                        controls={true}
                    > 

                    </ReactPlayer> */}
<div width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}>
{selectedVideoUrl ? (
    <video width="100%" height="100%" controls autoPlay>
        <source src={selectedVideoUrl} type={selectedVideoMimeType} />
        Your browser does not support the video tag.
    </video>
) : (
    <Typography>Not a video file</Typography>
)}
</div>


                    
                </div>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleCloseVideoDialog} color="error">
                    Close
                </Button>
            </DialogActions>

        </Dialog>
    </>


    );
}

export default VideoView;