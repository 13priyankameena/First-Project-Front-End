import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Typography, Box } from "@mui/material";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/chartDB/chartdatas")

  .then((res) => res.json())
  .then((data) => {
    console.log("Fetched Data:", data);
    setData(data);
  })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    document.title = "Dashboard | Priyanka";
  }, []);

  // Step 1: Calculate totals for Pie chart
  const totalStudents = data.reduce((sum, item) => sum + item.students, 0);
  const totalEmployees = data.reduce((sum, item) => sum + item.employees, 0);

  const pieData = [
    { name: "Students", value: totalStudents },
    { name: "Employees", value: totalEmployees },
  ];

  const COLORS = ["#8884d8", "#82ca9d"];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      {/* Bar Chart */}
      <Box sx={{ width: "100%", height: 300, mb: 4 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
            <Bar dataKey="employees" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Pie Chart */}
      <Box sx={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default Dashboard;
