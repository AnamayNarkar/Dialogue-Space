import React,{useState} from 'react'
import '../styles/App.css'
import Sidebar from './Sidebar'
import Chatlist from './Chatlist'
import Workarea from './Workarea'

function App(props) {

  return (
    <div className='appShell'>
      <Sidebar setAddFriendsTab={props.setAddFriendsTab} setOpenChat={props.setOpenChat} setSettingsTab={props.setSettingsTab}/>
      <Chatlist currentUser={props.userData.username} friends={props.userData.friendList} setOpenChat={props.setOpenChat} setAddFriendsTab={props.setAddFriendsTab} setSettingsTab={props.setSettingsTab}/>
      <Workarea currentUser={props.userData.username} userChats={props.userData.chatsWithFriends} openChat={props.openChat} addFriendsTab={props.addFriendsTab} settingsTab={props.settingsTab}/>
    </div>
  )
}

export default App