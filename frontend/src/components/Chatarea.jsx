import React, { useEffect } from 'react';
import '../styles/Chatarea.css';

function Chatarea(props) {

  useEffect(() => {
    document.querySelector('.chatArea').scrollTop = document.querySelector('.chatArea').scrollHeight;
  }, [props.chatsToDisplay]);

  return (
    <div className='chatArea'>
      {props.chatsToDisplay.map((chat)=>{
        return (
          <div key={chat._id} className={`chatBubble ${props.currentUser === chat.sender ? 'userMessage' : 'contactMessage'}`} >
            <p>{chat.message}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Chatarea;
