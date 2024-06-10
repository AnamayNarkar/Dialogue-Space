import React from 'react'
import '../styles/Sidebar.css'

function Sidebar(props) {

  function handleAddFriendsTab() {
    props.setOpenChat('');
    props.setSettingsTab(false);
    props.setAddFriendsTab(true);
  }

  function handleSettingsTab() {
    props.setOpenChat('');
    props.setAddFriendsTab(false);
    props.setSettingsTab(true);
  }

  return (
    <div className='sideBar'>
      <div className="sideBarBottomBar">
        <button className='addUserIconButton'><img src="/assets/addUserIcon.png" className="addUserIcon" onClick={handleAddFriendsTab} /></button>
        <img src="/assets/settingsIcon.png" className="settingsIcon" onClick={handleSettingsTab}></img>
      </div>
    </div>
  )
}

export default Sidebar