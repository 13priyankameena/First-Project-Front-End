import React, { useState, useEffect } from 'react';
import { File_download } from '../../API/api.js';
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

function FileDownload({ refresh }) {

    const [files, setFile] = useState([]);

    useEffect(() => {
        const Loadfile = async () => {
            try {

                const loadUploadedFile = await File_download();

                if (loadUploadedFile.success === true) {
                    const convertedFiles = loadUploadedFile.data.map((file) => {
                        if (file.Base64File) {

                            // Split Base64 into mime type and data

                            const parts = file.Base64File.split(";base64,");
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

                            return { ...file, fileUrl, mimeType };

                        }

                        return file;
                    });

                     setFile(convertedFiles);
                }


                   
            } catch (error) {
                console.log("Error in Loading File", error);
            }

        }

        Loadfile();
    }, [refresh]);


    return (

        <TableContainer component={Paper} sx={{ minWidth: "400px", mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Download</TableCell>
                      
                    </TableRow>



                </TableHead>
                <TableBody>
                    {files.map((file, index) => (
                        <TableRow key={index}>
                            <TableCell>{file.FileName}</TableCell>
                    
                            <TableCell>{file.mimeType?.startsWith("image/") ? (
                  <img
                    src={file.fileUrl}
                    alt={file.FileName}
                    width="50"
                    height="50"
                  />
                ) : (
                  <span>{file.FileName}</span>
                )}</TableCell>

                <TableCell>
                    
                    <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = file.fileUrl;
                    link.download = file.FileName; // set the original filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download
                </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>

    );
}

export default FileDownload;