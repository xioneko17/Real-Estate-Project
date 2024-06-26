import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const server = http.createServer(app);


app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

const PORT = 3000 || 5000;

server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})