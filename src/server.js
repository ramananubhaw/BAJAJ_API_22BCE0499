import express from "express";
import dotenv from "dotenv";
import controller from "./controllers.js";
import cron from "node-cron";
import axios from "axios";

const app = express();

dotenv.config({
    path: ['.env.local', '.env']
});

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>BAJAJ OA REST API endpoint</h1>")
});

app.post('/bfhl', controller);

cron.schedule("*/10 * * * *", async () => {
    try {
        const response = await axios.post(process.env.API_ENDPOINT, {
            data: ["ping"]
        });
        console.log("Cron job executed, response:", response.data);
    } catch (error) {
        console.error("Cron job failed:", error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
