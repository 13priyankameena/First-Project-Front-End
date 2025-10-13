import React, { useState, useEffect } from 'react';
import { File_download,File_delete } from '../../API/api.js';
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
    Button,CircularProgress,LinearProgress
} from "@mui/material";
import { toast,ToastContainer } from "react-toastify";
import {
 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
 
} from "@mui/material";

function FileDownload({ refresh }) {

    const [files, setFile] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [circularUpload,setCircularUpload] = useState(true);

    useEffect(() => {
        const Loadfile = async () => {
            try {

                const loadUploadedFile = await File_download();

                if (loadUploadedFile.success === true) {
            setCircularUpload(false);
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

      const result = await File_delete(selectedRowId);
      try {
        if (result.success) {
        toast.success("File deleted successfully!");

        // remove deleted file from UI without reloading
        setFile((prevFiles) => prevFiles.filter((f) => f._id !== selectedRowId));
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


    return (
<>
<ToastContainer position="top-right" autoClose={2000} />

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
          
          sx={{ width: "50%",ml:40,mt:20}}
        />
        <Typography sx={{ mt: 1 ,ml:40}}>Loading files...</Typography>
      </>
    ) : (
      <TableContainer component={Paper} sx={{ maxWidth: "700px"}}>

          
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Download</TableCell>
                        <TableCell>DELETE</TableCell>
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

{/* //for deleting file  */}
                                <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                 onClick={() =>handleDeleteClick(file._id)}  //i want send argument with function thatswhy i used here arrow function
                >
                  Delete
                </Button>
              </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    )
}
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
       
</>

    );
}

export default FileDownload;