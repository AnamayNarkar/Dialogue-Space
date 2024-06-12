import React, { useState } from 'react';
import '../styles/Sendfriendrequeststab.css';
import axios from 'axios';

function Sendfriendrequeststab(props) {
  const [friendRequestRecipient, setFriendRequestRecipient] = useState('');

  const handleInputChange = (event) => {
    setFriendRequestRecipient(event.target.value);
  };

  async function sendFriendRequest (event){

    event.preventDefault();

    if(friendRequestRecipient.trim() === ''){
      alert('Please enter a username');
      return;
    }

    if(friendRequestRecipient.trim() === props.currentUser){
      alert('You cannot send a friend request to yourself');
      return;
    }

    const dataToSend = {
      sender: props.currentUser,
      receiver: friendRequestRecipient.trim()
    };

    try {
      const response = await axios.post('/sendFriendRequest', dataToSend);
      
      if(response.data === "Friend request sent successfully"){
        setFriendRequestRecipient('');
      }else{
        alert(response.data);
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className='sendFriendRequestsTab'>
      <div className='sendFriendRequestsTabInput'>
        <form onSubmit={sendFriendRequest} >
          <input
            type="text"
            placeholder="Type a username"
            value={friendRequestRecipient}
            onChange={handleInputChange}
          />
          <button type="submit" classname="sendfriendRequestFormButton" >
            <img
              src="./assets/sendIcon.png"
              alt="Send Icon"
             />
          </button>
        </form>
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