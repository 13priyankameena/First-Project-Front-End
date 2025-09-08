
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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/chartDB/forms")
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch((err) => console.error(err));
  }, [refresh]);

 if (!rows.length) return <p style={{ padding: "20px" }}>No Data Found</p>;


  const latest = rows[rows.length - 1];

  return (
    <TableContainer>
         <Table>
        <TableBody>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell>{latest.Name}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>Email</b></TableCell>
            <TableCell>{latest.Email}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>Age</b></TableCell>
            <TableCell>{latest.Age}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>Describe You</b></TableCell>
            <TableCell>{latest. DescribeYou}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>Recommend this to friend</b></TableCell>
            <TableCell>{latest.RecommendToFriend}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>Languages You Know</b></TableCell>
            <TableCell>{latest.Languages?.join(", ")}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>Comments</b></TableCell>
            <TableCell>{latest.Comment}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FormRightTable;