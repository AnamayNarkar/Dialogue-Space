import React from 'react'
import '../styles/Sendfriendrequeststab.css'

function Sendfriendrequeststab(props) {
  return (
    <div className='sendFriendRequestsTab'>

      <div className='sendFriendRequestsTabInput'>
        <input type="text" placeholder="Type a username"/>
        <img src="./assets/sendIcon.png"/>
      </div>  

      <div className='previouslySentFriendRequests'>
          {props.friendRequestsSent ? props.friendRequestsSent.map((friendRequestSent) => (
            <div className='friendRequestSent' key={friendRequestSent}>
              <div key={friendRequestSent} className="friendRequestSentInfo">
                <img src="/assets/defaultProfileIcon.png" alt="Profile Icon" />
                <h3>{friendRequestSent}</h3>
              </div>

              <div className="takeRequestBack">
                <h3>Take Back</h3>
              </div>

            </div>
          )) : null}
      </div>

    </div>
  )
}

export default Sendfriendrequeststab