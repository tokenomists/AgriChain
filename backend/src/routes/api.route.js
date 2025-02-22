import express from "express"
import fetchNews from "../controller/fetchNews.js";
import geminiProcessor from "../controller/gemini.js"
import farmerInsights from '../controller/farmerInsights.js';
import productInsights from '../controller/productInsights.js';
import fetchWeatherForecast from "../controller/weather.js";
import salesAnalytics from "../controller/salesAnalytics.js";

const router = express.Router()

router.get('/sales', salesAnalytics);

router.get("/farmerNews", fetchNews);

router.post("/gemini", geminiProcessor);  

router.get("/farmerInsights", farmerInsights);

router.get("/productInsights", productInsights);

router.get("/weather", fetchWeatherForecast);

export default router;
