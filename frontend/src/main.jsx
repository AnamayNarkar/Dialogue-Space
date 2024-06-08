import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import io from 'socket.io-client';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") ?"true" : "false")
  const [userData, setUserData] = useState(localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {});

  const socket = io.connect('http://localhost:3000');

  socket.on('connect', () => {
    console.log("Connected to socket server");

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

  useEffect(() => {
    if (userData && userData.username) {
      socket.emit('newUser', userData.username);
      console.log(userData.username);
    }
  }, [userData, socket]);

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