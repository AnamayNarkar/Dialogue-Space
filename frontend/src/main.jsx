import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios';
import io from 'socket.io-client';

import App from './components/App.jsx';
import Login from './components/Login.jsx';

function Root() {

  const [userData, setUserData] = useState(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {});
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") ? true : false);

  const socket = io.connect('http://localhost:3000');

  socket.on('connect', () => {
    console.log("Connected to server through socket.io!");

    socket.on('newMessage', (messageObj) => {

      setUserData((prevUserData) => {
        console.log(prevUserData);
        const newUserData = { ...prevUserData };
        const chatToUpdate = newUserData.chatsWithFriends.find(
          (chat) => chat.friendUserName === messageObj.receiver || chat.friendUserName === messageObj.sender
        );
        chatToUpdate.messages.unshift(messageObj);
        localStorage.setItem('userData', JSON.stringify(newUserData));
        return newUserData;
      });
    });
  });

  // useEffect to send every new user to server
  useEffect(() => {
    if (userData && userData.username) {
      socket.emit('newUser', userData.username);
    }
  }, [socket]);

  // useEffect to get latest user data from server every time the client reloads
  useEffect(() => {
    async function fetchData() {
      if (userData && userData.username) {
        const userDataToSend = {
          username: userData.username,
          email: userData.email
        };

        try {
          const response = await axios.get('/getLatestUserData', { params: userDataToSend });
          localStorage.setItem('userData', JSON.stringify(response.data));
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching latest user data:', error);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={Boolean(localStorage.getItem('isLoggedIn')) ? <App userData={userData} /> : <Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
