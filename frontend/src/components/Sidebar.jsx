import React from 'react'
import '../styles/Sidebar.css'

function Sidebar(props) {

  function delay(time){
    return new Promise ((res,rej)=>{
      setTimeout(()=>{
        null;
      },time)
    })
  }

  function handleAddFriendsTab() {
    props.setOpenChat('');
    props.setOpenSettingsTab(false);
    props.setOpenAddFriendsTab(true);
  }

  function handleSettingsTab() {
    props.setOpenChat('');
    props.setOpenAddFriendsTab(false);
    props.setOpenSettingsTab(true);
  }

  async function handleLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('userData')
      props.setUserData({});
      localStorage.removeItem('isLoggedIn');
      props.setIsLoggedIn(false);
    }
  }

  return (
    <div className='sideBar'>
      <div className="sideBarBottomBar">
        <button className='addUserIconButton'><img src="/assets/addUserIcon.png" className="addUserIcon" onClick={handleAddFriendsTab} /></button>
        <img src="/assets/settingsIcon.png" className="settingsIcon" onClick={handleSettingsTab}></img>
        <img src="/assets/logoutIcon.png" className='logoutIcon'onClick={handleLogout} ></img>
      </div>
    </div>
  )
}

export default Sidebar