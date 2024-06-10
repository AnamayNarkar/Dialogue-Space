import React from 'react'
import '../styles/Workarea.css'
import Inputform from './Inputform'
import Chatcomponent from './Chatcomponent'
import Addfriendstab from './Addfriendstab'
import Settingstab from './Settingstab'

function Workarea(props) {
  return (
    <div className='workArea'>
      {props.openChat ? (
        <Chatcomponent currentUser={props.currentUser} userChats={props.userChats} openChat={props.openChat} />
      ) : props.addFriendsTab ? (
        <Addfriendstab />
      ) : props.settingsTab ? (
        <Settingstab />
      ) : (
        <h2 className="openAChatText">Open a Chat</h2>
      )}
    </div>
  )
}

export default Workarea