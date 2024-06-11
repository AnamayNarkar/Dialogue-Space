import React from 'react';
import '../styles/Friendrequestslisttab.css';

import axios from 'axios';

function Friendrequestslisttab(props) {

  async function handleAcceptFriendRequest(event) {
    const friendRequestName = event.target.parentElement.parentElement.querySelector('.friendRequestName h3').textContent;
    console.log(friendRequestName);
    const friendRequestResponse = axios.post('/acceptFriendRequest', { friendRequestName: friendRequestName, currentUser: props.currentUser });
  }

  async function handleRejectFriendRequest(event) {
    const friendRequestName = event.target.parentElement.parentElement.querySelector('.friendRequestName h3').textContent;
    console.log(friendRequestName);
    const friendRequestResponse = axios.post('/rejectFriendRequest', { friendRequestName: friendRequestName, currentUser: props.currentUser });
  }

  return (
    <div className='friendRequestsListTab'>
      {props.friendRequestsReceived.length === 0 ? null :
        props.friendRequestsReceived.map((friendRequest, index) => (
          <div key={index} className='friendRequest'>
            <div className='friendRequestInfo'>
              <img src="/assets/defaultProfileIcon.png" />
              <h3>{friendRequest}</h3>
            </div>
            <div className='acceptAndRejectButtons'>
              <h3 className='acceptButton' onClick={handleAcceptFriendRequest}>Accept</h3>
              <h3 className='rejectButton' onClick={handleRejectFriendRequest} >Reject</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Friendrequestslisttab;
