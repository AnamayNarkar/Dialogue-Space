import React, { useEffect } from 'react';
import '../styles/Chatarea.css';

function Chatarea(props) {
  
  useEffect(() => {
    document.querySelector('.chatArea').scrollTop = document.querySelector('.chatArea').scrollHeight;
  }, [props.chatsToDisplay]);

  return (
    <div className='chatArea'>
      {props.chatsToDisplay.length > 0 ? (
        props.chatsToDisplay.map((chat,index) => (
          // add dates condition
          // if(index === 0 || props.chatsToDisplay[index-1].date !== props.chatsToDisplay[index].date){
            
          // }
          <div key={chat._id} className={`chatBubble ${props.currentUser === chat.sender ? 'userMessage' : 'contactMessage'}`}>
            <p className='chatMessage'>{chat.message}</p>
            <p className='chatTime'>{chat.time}</p>
          </div>

        ))
      ) : null
      }
    </div>
  );
}

export default Chatarea;