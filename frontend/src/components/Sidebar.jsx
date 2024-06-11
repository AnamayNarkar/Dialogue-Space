import React from 'react'
import '../styles/Sidebar.css'

function Sidebar(props) {

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