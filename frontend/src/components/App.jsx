import React,{useState} from 'react'
import '../styles/App.css'
import Sidebar from './Sidebar'
import Chatlist from './Chatlist'
import Workarea from './Workarea'

function App(props) {

  return (
    <div className='appShell'>
      <Sidebar setOpenAddFriendsTab={props.setOpenAddFriendsTab} setOpenChat={props.setOpenChat} setOpenSettingsTab={props.setOpenSettingsTab}/>
      <Chatlist currentUser={props.userData.username} friendList={props.userData.friendList} setOpenChat={props.setOpenChat} setOpenAddFriendsTab={props.setOpenAddFriendsTab} setOpenSettingsTab={props.setOpenSettingsTab}/>
      <Workarea currentUser={props.userData.username} currentUserId={props.userData._id} chatsWithFriends={props.userData.chatsWithFriends} openChat={props.openChat} openAddFriendsTab={props.openAddFriendsTab} openSettingsTab={props.openSettingsTab} friendRequestsReceived={props.userData.friendRequestsReceived} friendRequestsSent={props.userData.friendRequestsSent}/>
    </div>
  )
}

export default App