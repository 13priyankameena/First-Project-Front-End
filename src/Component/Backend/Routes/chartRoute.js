import express from "express";
import { createChartData, fetchChartData } from "../controller/chartController.js";

const router = express.Router();

router.post("/create", createChartData);
router.get("/fetch", fetchChartData);

export default router;