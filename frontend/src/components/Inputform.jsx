import React from 'react';
import '../styles/Inputform.css';
import axios from 'axios';

function Inputform(props) {

  async function handleSendMessage(event) {
    event.preventDefault();

    const messageObject = {
      sender: props.currentUser,
      receiver: props.openChat,
      message: event.target[0].value,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString() 
    };

    event.target[0].value = '';

    try {
      const response = await axios.post("/sendMessage", messageObject);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='inputForm'>
      <form action="/sendMessage" method="POST" onSubmit={handleSendMessage}>
        <input type='text' placeholder='Type a message' />
        <button type='submit'><img src="/assets/sendIcon.png" alt="send" /></button>
      </form>
    </div>
  );
}

export default Inputform;
