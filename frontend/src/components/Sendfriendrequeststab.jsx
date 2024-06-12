import React, { useState } from 'react';
import '../styles/Sendfriendrequeststab.css';
import axios from 'axios';

function Sendfriendrequeststab(props) {
  const [friendRequestRecipient, setFriendRequestRecipient] = useState('');

  const handleInputChange = (event) => {
    setFriendRequestRecipient(event.target.value);
  };

  const sendFriendRequest = async () => {
    const dataToSend = {
      sender: props.currentUser,
      receiver: friendRequestRecipient
    };

    try {
      const response = await axios.post('/sendFriendRequest', dataToSend);
      console.log(response);
      setFriendRequestRecipient('');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className='sendFriendRequestsTab'>
      <div className='sendFriendRequestsTabInput'>
        <input
          type="text"
          placeholder="Type a username"
          value={friendRequestRecipient}
          onChange={handleInputChange}
        />
        <img
          src="./assets/sendIcon.png"
          alt="Send Icon"
          onClick={sendFriendRequest}
        />
      </div>
      <div className='previouslySentFriendRequests'>
        {props.friendRequestsSent ? props.friendRequestsSent.map((friendRequestSent) => (
          <div className='friendRequestSent' key={friendRequestSent._id}>
            <div className="friendRequestSentInfo">
              <img src="/assets/defaultProfileIcon.png" alt="Profile Icon" />
              <h3>{friendRequestSent.username}</h3>
            </div>
            <div className="takeRequestBack">
              <h3>Take Back</h3>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
}

export default Sendfriendrequeststab;