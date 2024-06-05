import React from 'react'
import '../styles/Chatboard.css'
import Inputform from './Inputform'
import Chatcomponent from './Chatcomponent'

function Chatboard(props) {

  return (
    <div className='chatBoard'>
      {props.openChat ? <Chatcomponent currentUser={props.currentUser} userChats={props.userChats} openChat={props.openChat}/> : <h2>Open a Chat</h2>}
    </div>
  )
}




export default Chatboard