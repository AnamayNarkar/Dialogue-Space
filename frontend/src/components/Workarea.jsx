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
        <Chatcomponent currentUser={props.currentUser} chatsWithFriends={props.chatsWithFriends} openChat={props.openChat} currentUserId={props.currentUserId}/>
      ) : props.openAddFriendsTab ? (
        <Addfriendstab currentUser={props.currentUser} friendRequestsReceived={props.friendRequestsReceived} friendRequestsSent={props.friendRequestsSent}/>
      ) : props.openSettingsTab ? (
        <Settingstab />
      ) : (
        <h2 className="openAChatText">Open a Chat</h2>
      )}
    </div>
  )
}

export default Workarea