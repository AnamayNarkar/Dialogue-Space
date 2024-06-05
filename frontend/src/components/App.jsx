import React,{useState} from 'react'
import '../styles/App.css'
import Sidebar from './Sidebar'
import Chatlist from './Chatlist'
import Chatboard from './Chatboard'
import {userData} from '../userData.js'

function App() {

  const [openChat, setOpenChat] = useState('');

  return (
    <div className='appShell'>
      <Sidebar />
      <Chatlist currentUser={userData[0].userName} friends={userData[0].friends} setOpenChat={setOpenChat}/>
      <Chatboard currentUser={userData[0].userName} userChats={userData[0].chatsWithFriends} openChat={openChat}/>
    </div>
  )
}

export default App