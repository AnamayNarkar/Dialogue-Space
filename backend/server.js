import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  console.log("Login request received");
  console.log(req.body);
  res.send("Login request received"); //sample response
});

app.post('/signup', (req, res) => {
  console.log("Signup request received");
  console.log(req.body);
  res.send("Signup request received"); //sample response
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});
