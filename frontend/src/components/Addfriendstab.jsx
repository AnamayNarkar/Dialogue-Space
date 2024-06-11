import React from 'react'
import '../styles/Addfriendstab.css'

import Friendheader from './Friendheader'
import Sendfriendrequeststab from './Sendfriendrequeststab'
import Friendrequestslisttab from './Friendrequestslisttab'

function Addfriendstab(props) {

  const [ openSendFriendRequestsTab , setOpenSendFriendRequestsTab ] = React.useState(true)
  const [ openFriendRequestsTab , setOpenFriendRequestsTab ] = React.useState(false)

  console.log(props.friendRequestsSent)
  console.log(props.friendRequestsReceived)

  return (
    <div className='addFriendsTab'>
        <Friendheader setOpenSendFriendRequestsTab={setOpenSendFriendRequestsTab} setOpenFriendRequestsTab={setOpenFriendRequestsTab}/>
        {openSendFriendRequestsTab ? <Sendfriendrequeststab friendRequestsSent={props.friendRequestsSent}/> : openFriendRequestsTab ? <Friendrequestslisttab friendRequestsReceived={props.friendRequestsReceived} currentUser={props.currentUser}/> : null}
    </div>
  )
}

export default Addfriendstab