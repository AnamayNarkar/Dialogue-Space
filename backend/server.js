import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './mongoDB/connect.js';
import allRoutes from './routes/routes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB('mongodb://localhost:27017/dialogueSpace');

app.use('/', allRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});
