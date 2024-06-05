import React from 'react'
import '../styles/Chatcomponent.css'
import Inputform from './Inputform.jsx'
import Chatheader from './Chatheader.jsx'
import Chatarea from './Chatarea.jsx'

function Chatcomponent(props) {

  const chatsToDisplayObject = props.userChats.filter((chat)=>{
    return chat.friendUserName === props.openChat;
  })

  //we need to use [0] because the filter method returns an array of objects , the length of the array is 1 because of the unique friendUserName

  const chatsToDisplay = chatsToDisplayObject[0].messages;

  return (
    <div className="chatComponent">
        <Chatheader openChat={props.openChat}/>
        <Chatarea currentUser={props.currentUser} chatsToDisplay={chatsToDisplay}/>
        <Inputform />
    </div>
  )
}

export default Chatcomponent