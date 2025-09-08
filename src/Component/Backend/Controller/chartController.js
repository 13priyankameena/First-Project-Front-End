import Chart from "../model/chartModel.js";

//Add new Data

export const createChartData = async(req,res)=>{
    try {
        const chart=new Chart(req.body);
        const saved=await chart.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({error:"Error saving chart data"})
    }
};

//fetch all data

export const fetchChartData = async(req,res) => {
    try {
        const data = await Chart.find();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: "Error fetching chart data" });
    }
};