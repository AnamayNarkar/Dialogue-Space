import React from 'react'
import '../styles/Sidebar.css'

function Sidebar() {
  return (
    <div className='sideBar'>
      <div className="sideBarBottomBar">
        <button className='addUserIconButton'><img src="/assets/addUserIcon.png" className="addUserIcon"/></button>
        <img src="/assets/settingsIcon.png" className="settingsIcon"></img>
      </div>
    </div>
  )
}

export default Sidebar