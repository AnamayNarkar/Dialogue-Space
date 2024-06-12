import React from 'react';
import '../styles/Friendrequestslisttab.css';
import axios from 'axios';

function Friendrequestslisttab(props) {

  async function handleAcceptFriendRequest(event) {
    const friendRequestElement = event.target.closest('.friendRequest');
    const senderUsername = friendRequestElement.querySelector('.friendRequestName').textContent;
    const senderUserId = friendRequestElement.id;

    const friendRequestInfo = {
      senderUsername: senderUsername,
      senderUserId: senderUserId,
    };

    const acceptorInfo = {
      acceptorUsername: props.currentUser,
      acceptorUserId: props.currentUserId,
    };

    const dataToSend = {
      friendRequestInfo: friendRequestInfo,
      acceptorInfo: acceptorInfo,
    };

    const friendRequestResponse = await axios.post('/acceptFriendRequest', dataToSend);
    console.log(friendRequestResponse);
  }

  async function handleRejectFriendRequest(event) {
    const friendRequestElement = event.target.closest('.friendRequest');
    const sendersUsername = friendRequestElement.querySelector('.friendRequestName').textContent;
    const sendersId = friendRequestElement.id;

    const friendRequestInfo = {
      sendersId: sendersId,
      senderUsername: sendersUsername,
    };

    const rejectorInfo = {
      rejectorUsername: props.currentUser,
      rejectorUserId: props.currentUserId,
    };

    const dataToSend = {
      friendRequestInfo: friendRequestInfo,
      rejectorInfo: rejectorInfo,
    }

    const friendRequestResponse = await axios.post('/rejectFriendRequest', dataToSend);
    console.log(friendRequestResponse);
  }

  return (
    <div className='friendRequestsListTab'>
      {props.friendRequestsReceived.length === 0 ? null :
        props.friendRequestsReceived.map((friendRequest) => (
          <div
            key={friendRequest._id}
            id={friendRequest._id}
            className='friendRequest'
          >
            <div className='friendRequestInfo'>
              <img src="/assets/defaultProfileIcon.png" alt="Profile" />
              <h3 className='friendRequestName'>{friendRequest.username}</h3>
            </div>
            <div className='acceptAndRejectButtons'>
              <h3 className='acceptButton' onClick={handleAcceptFriendRequest}>Accept</h3>
              <h3 className='rejectButton' onClick={handleRejectFriendRequest}>Reject</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Friendrequestslisttab;
