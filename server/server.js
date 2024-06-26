import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import sequelize from './src/config/db.js';
dotenv.config()

const app = express();
const server = http.createServer(app);


app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

const PORT = 3000 || 5000;

sequelize.sync({ force: true }).then(() => {
    console.log('Database & Tables created!');
    
    server.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database', err);
});

process.on('SIGINT', async (err) => {
    try {
        await sequelize.close();
        console.log('Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing connection', error);
        process.exit(1);
    }
});