import {getMeasurement, getTimeSeries} from "../controllers/carto.controllers";
import express from "express";

const router = express.Router();

router.get("/measurement?", getMeasurement);
router.get("/time-series?", getTimeSeries);

export default router;
