import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './mongoDB/connect.js';
import allRoutes from './routes/routes.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB('mongodb://localhost:27017/dialogueSpace');

app.use('/', allRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = app.listen(3000, () => {
  console.log('Server is running on Port 3000');
});

const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

let usersAndSockets = {};

io.on('connection', (socket) => {
  console.log('User connected at socket id', socket.id);

  socket.on('newUser', (username) => {
    usersAndSockets[username] = socket.id;
    console.log(usersAndSockets);
  });

  socket.on('disconnect', () => {
    for (const [username, socketId] of Object.entries(usersAndSockets)) {
      if (socketId === socket.id) {
        delete usersAndSockets[username];
        break;
      }
    }
  });
});

export { io, usersAndSockets };