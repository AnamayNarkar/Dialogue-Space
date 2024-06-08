import React from 'react';
import '../styles/Inputform.css';
import axios from 'axios';

function Inputform(props) {
  async function handleMessage(event) {
    event.preventDefault();

    const messageObject = {
      sender: props.currentUser,
      receiver: props.openChat,
      message: event.target[0].value,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString() 
    };
    console.log(messageObject);

    try {
      const response = await axios.post("http://localhost:3000/sendMessage", messageObject);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='inputForm'>
      <form action="/sendMessage" method="POST" onSubmit={handleMessage}>
        <input type='text' placeholder='Type a message' />
        <button type='submit'><img src="/assets/sendIcon.png" alt="send" /></button>
      </form>
    </div>
  );
}

export default Inputform;
