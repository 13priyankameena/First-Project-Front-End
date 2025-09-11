
import React, { useEffect,useState} from "react";
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
} from "@mui/material";


function FormRightTable({ refresh }) {

const [formData, setFormTable] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8000/chartDB/forms")

  .then((res) => res.json())
  .then((Data) => {
    console.log("Fetched Data:", Data);
    setFormTable(Data);
  })
      .catch((err) => console.error(err));
  }, [refresh]);


  return (



<TableContainer component={Paper} sx={{  width:1000,mt:4 }}>
  <Table>
    <TableHead>
<TableRow sx={{ backgroundColor: "#1976d2" }}>
  <TableCell><b>Name</b></TableCell>
         <TableCell><b>Email</b></TableCell>
          <TableCell><b>Age</b></TableCell>
           <TableCell><b>Describe You</b></TableCell>
            <TableCell><b>Recommend this to friend</b></TableCell>
            <TableCell><b>Languages You Know</b></TableCell>
            
             <TableCell><b>Comments</b></TableCell>
  
</TableRow>
</TableHead>
<TableBody>
  {
    formData.map((formData)=>(
      <TableRow key={formData.Email}>
        <TableCell>{formData.Name}</TableCell>
        <TableCell>{formData.Email}</TableCell>
         <TableCell>{formData.Age}</TableCell>
          <TableCell>{formData.DescribeYou}</TableCell>
           <TableCell>{formData.RecommendToFriend}</TableCell>
            <TableCell>{formData.Languages}</TableCell>
            <TableCell>{formData.Comment}</TableCell>
      </TableRow>
    )
    )
  }
</TableBody>
  </Table>
</TableContainer>














    // <TableContainer>
    //      <Table>
    //     <TableBody>
    //       <TableRow>
    //         <TableCell><b>Name</b></TableCell>
    //         <TableCell>{latest.Name}</TableCell>
    //       </TableRow>

    //       <TableRow>
    //         <TableCell><b>Email</b></TableCell>
    //         <TableCell>{latest.Email}</TableCell>
    //       </TableRow>

    //       <TableRow>
    //         <TableCell><b>Age</b></TableCell>
    //         <TableCell>{latest.Age}</TableCell>
    //       </TableRow>

    //       <TableRow>
    //         <TableCell><b>Describe You</b></TableCell>
    //         <TableCell>{latest. DescribeYou}</TableCell>
    //       </TableRow>

    //       <TableRow>
    //         <TableCell><b>Recommend this to friend</b></TableCell>
    //         <TableCell>{latest.RecommendToFriend}</TableCell>
    //       </TableRow>

    //       <TableRow>
    //         <TableCell><b>Languages You Know</b></TableCell>
    //         <TableCell>{latest.Languages?.join(", ")}</TableCell>
    //       </TableRow>

    //       <TableRow>
    //         <TableCell><b>Commentsss</b></TableCell>
    //         <TableCell>{latest.Comment}</TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  )
}

export default FormRightTable;