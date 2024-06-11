import React from 'react'
import '../styles/Friendheader.css'

function Friendheader(props) {

  function handleSendFriendRequestsHeaderClick() {
    props.setOpenFriendRequestsTab(false)
    props.setOpenSendFriendRequestsTab(true)
  }

  function handleFriendRequestsListHeaderClick() {
    props.setOpenSendFriendRequestsTab(false)
    props.setOpenFriendRequestsTab(true)
  }

  return (
    <div className='friendsHeader'>
        <h2 className='tabs sendFriendRequestsHeader' onClick={handleSendFriendRequestsHeaderClick}>Send Requests</h2>
        <h2 className='tabs friendRequestsListHeader' onClick={handleFriendRequestsListHeaderClick}>Friend Requests</h2>
    </div>
  )
}

export default Friendheader