import express from "express";
import dotenv from "dotenv";
import controller from "./controllers.js";

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});