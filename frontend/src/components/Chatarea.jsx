import React, { useEffect } from 'react';
import '../styles/Chatarea.css';

function Chatarea(props) {
  useEffect(() => {
    document.querySelector('.chatArea').scrollTop = document.querySelector('.chatArea').scrollHeight;
  }, [props.chatsToDisplay]);

  return (
    <div className='chatArea'>
      {props.chatsToDisplay.length > 0 ? (
        props.chatsToDisplay.map((chat, index) => {
          const showDate = index === props.chatsToDisplay.length - 1 || props.chatsToDisplay[index + 1].date !== chat.date;
          return (
            <React.Fragment key={chat._id}>
              <div className={`chatBubble ${props.currentUser === chat.sender ? 'userMessage' : 'contactMessage'}`}>
                <p className='chatMessage'>{chat.message}</p>
                <p className='chatTime'>{chat.time}</p>
              </div>
              {showDate && <div className="chatDate">{chat.date}</div>}
            </React.Fragment>
          );
        })
      ) : null}
    </div>
  );
}

export default Chatarea;