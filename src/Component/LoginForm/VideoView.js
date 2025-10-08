import React, { useState, useEffect } from 'react';
import { Video_view } from '../../API/api.js';
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
    Button
} from "@mui/material";

function VideoView({refresh}) {

const [videos, setVideos] = useState([]);

useEffect(() => {

    const loadVideos = async () =>{
        try {
            const loadVideoFiles = await Video_view();
            console.log(loadVideoFiles);

            if(loadVideoFiles.success === true){
                const convertedFiles = loadVideoFiles.data.map((video) => {
                    if(video.Base64File){
                        
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
},[refresh]);

  return (
   <TableContainer>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Video Name</TableCell>
                <TableCell>View</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {videos.map((video,index) =>(
                <TableRow key={index}>

                    <TableCell>{video.FileName}</TableCell>

                   <TableCell>
                {video.mimeType?.startsWith("video/") ? (
                  <video width="150" height="100" controls>
                    <source src={video.fileUrl} 
                    type={video.mimeType} />
                  </video>
                ) : (
                  <Typography>Not a video file</Typography>
                )}
              </TableCell>

                </TableRow>
            ))}
        </TableBody>
    </Table>
   </TableContainer>

  );
}

export default VideoView;