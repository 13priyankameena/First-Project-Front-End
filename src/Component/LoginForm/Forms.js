import FormRightTable from "./FormRightTable.js";
import { Box, flex, height, padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Button,
    TextareaAutosize,
    FormLabel,
    FormGroup
} from "@mui/material";


function Forms() {
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Age: "",
        DescribeYou: "",
        RecommendToFriend: "",
        Languages: [],
        Comment: "",
    });

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        document.title = "Forms | Priyanka";
    }, []);


    // handle change for text/number/email
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle checkbox (languages array)
    const handleLanguageChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, Languages: [...formData.Languages, value] });
        } else {
            setFormData({
                ...formData,
                Languages: formData.Languages.filter((lang) => lang !== value),
            });
        }
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/chartDB/forms/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Form submitted successfully ");

                // reset form
                setFormData({
                    Name: "",
                    Email: "",
                    Age: "",
                    DescribeYou: "",
                    RecommendToFriend: "",
                    Languages: [],
                    Comment: "",
                });

                // refresh right table
                setRefresh((r) => !r);
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };




    return (


        <Box sx={{ mt: 3, ml: 9, width: "95%" }}>
           <Box sx={{width:"90%",backgroundColor:"primary",height:50, borderTopLeftRadius: 4,borderTopRightRadius:4,
                boxShadow: 2,}}></Box>
            <Box sx={{
                width: "90%", border: "1px solid #ccc", backgroundColor: "white", padding: 4,
                borderBottomLeftRadius: 4,borderBottomRightRadius:4,
                boxShadow: 2,
            }}>


                <form onSubmit={handleSubmit}>


                    {/* Name */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="Name"
                        variant="outlined"
                        placeholder="Enter your name"
                        value={formData.Name}
                        onChange={handleChange}
                    />

                    {/* Email */}
                    <TextField
                        fullWidth
                        margin="normal"
                        type="email"
                        name="Email"
                        label="Email"
                        variant="outlined"
                        placeholder="Enter your email"
                        value={formData.Email}
                        onChange={handleChange}
                    />

                    {/* Age */}
                    <TextField
                        fullWidth
                        margin="normal"
                        type="number"
                        label="Age"
                        name="Age"
                        variant="outlined"
                        placeholder="Enter your age"
                        value={formData.Age}
                        onChange={handleChange}
                    />

                    {/* Dropdown */}
                    <Typography sx={{ color: "rgb(105, 107, 121)" }}>Which option best describes you?</Typography>


                    <FormControl fullWidth margin="normal">

                        <Select defaultValue=""
                            name="DescribeYou"
                            value={formData.DescribeYou}
                            onChange={handleChange}
                            sx={{ color: "rgb(105, 107, 121)" }}>
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Intern">Intern</MenuItem>
                            <MenuItem value="Professional">Professional</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Radio Buttons */}
                    <FormControl margin="normal" sx={{mr:20}}>
                        <FormLabel>Would you recommend this to a friend?</FormLabel>
                        <RadioGroup
                            name="RecommendToFriend"
                            value={formData.RecommendToFriend}
                            onChange={handleChange}
                            sx={{ color: "rgb(105, 107, 121)" }}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel
                                value="maybe"
                                control={<Radio />}
                                label="Maybe"
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* Checkboxes */}
                    <FormControl margin="normal" component="fieldset">
                        <FormLabel component="legend">
                            Languages and Frameworks Known
                        </FormLabel>
                        <FormGroup sx={{ color: "rgb(105, 107, 121)" }}>
                            {[
                                "C",
                                "C++",
                                "C#",
                                "Java",
                                "Python",
                                "Javascript",
                                "React",
                                "Angular",
                                "Django",
                                "Spring",
                            ].map((lang) => (
                                <FormControlLabel
                                    key={lang}
                                    control={
                                        <Checkbox
                                            value={lang}
                                            checked={formData.Languages.includes(lang)}
                                            onChange={handleLanguageChange}
                                        />
                                    }
                                    label={lang}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>

                    {/* Textarea */}
                    <FormControl fullWidth margin="normal">
                        <FormLabel sx={{paddingY:2}}>Any Comments or Suggestions</FormLabel>
                        <TextareaAutosize
                            minRows={4}
                            name="Comment"
                            value={formData.Comment}
                            onChange={handleChange}
                            placeholder="Enter your text here"
                            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                        />
                    </FormControl>


                    {/* Submit */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Box>

            {/* Right Table */}
            <Box sx={{ width: "50%", height: "100%" }}>
                <FormRightTable refresh={refresh} />
            </Box>
        </Box>
    );
}

export default Forms;