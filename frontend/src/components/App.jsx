import React,{useState} from 'react'
import '../styles/App.css'
import Sidebar from './Sidebar'
import Chatlist from './Chatlist'
import Chatboard from './Chatboard'

function App(props) {

  const [openChat, setOpenChat] = useState('');

  return (
    <div className='appShell'>
      <Sidebar />
      <Chatlist currentUser={props.userData.username} friends={props.userData.friendList} setOpenChat={setOpenChat}/>
      <Chatboard currentUser={props.userData.username} userChats={props.userData.chatsWithFriends} openChat={openChat}/>
    </div>
  )
}

export default App