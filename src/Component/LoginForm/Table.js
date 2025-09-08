import { Box, flex, height } from "@mui/system";
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
} from "@mui/material";
function TablePage() {


const [students, setStudent] = useState([]);
const [employees, setEmployees] = useState([]);

//fetch students collection

  useEffect(() => {
    fetch("http://localhost:8000/chartDB/students")

  .then((res) => res.json())
  .then((students) => {
    console.log("Fetched Data:", students);
    setStudent(students);
  })
      .catch((err) => console.error(err));
  }, []);


    useEffect(() => {
        document.title = "Table | Priyanka";
    }, [])


    //fetch employees collection

    useEffect(() => {
    fetch("http://localhost:8000/chartDB/employees")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Employees:", data);
        setEmployees(data);
      })
      .catch((err) => console.error(err));
  }, []);

    return (
        <>
            <Box display="flex" gap={10} mt={3} ml={8}>

                <Box>


                    <Box><Typography>Student Table</Typography></Box>


                    <TableContainer component={Paper} sx={{ height: 375, width: 430 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                    <TableCell>StudentID</TableCell>
                                    <TableCell>StudentName</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Subject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    students.map((students) => (
                                        <TableRow key={students.ID}>
                                            <TableCell>{students.ID}</TableCell>
                                            <TableCell>{students.StudentName}</TableCell>
                                            <TableCell>{students.Age}</TableCell>
                                            <TableCell>{students.Subject}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>



                    </TableContainer>

                </Box>

                <Box>
                    <Typography>
                        Employee Table
                    </Typography>
                    <TableContainer component={Paper} sx={{ height: 375, width: 430 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                    <TableCell>EmployeeID</TableCell>
                                    <TableCell>EmployeeName</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Department</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{employees.map((emp) => (
                                <TableRow key={emp.ID}>
                                    <TableCell>{emp.ID}</TableCell>
                                    <TableCell>{emp.EmployeeName}</TableCell>
                                    <TableCell>{emp.Age}</TableCell>
                                    <TableCell>{emp.Department}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
}
export default TablePage;