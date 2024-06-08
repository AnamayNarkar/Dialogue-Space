import React from "react";
import "../styles/Chatlist.css";
import { chatPanels } from "../data.js";

function Chatlist(props) {
  function openChat(event) {
    const chatPanel = event.currentTarget;
    const friendName = chatPanel.querySelector("h4").innerText;
    props.setOpenChat(friendName);
  }

  return (
    <div className="chatList">
      <div className="conversations">
        <h5>Conversations</h5>
      </div>
      <div className="chatListbottomBar">
        <div className="conversationsList">
          {props.friends.map((friend) => {
            return (
              <div key={friend} className="chatPanel" onClick={openChat}>
                <img src="/assets/defaultProfileIcon.png" alt="Profile Icon" />
                <h4>{friend}</h4>
              </div>
            );
          })}
        </div>
        <div className="userInfo">
          <img
            src="/assets/defaultProfileIcon.png"
            className="selfProfileIcon"
            alt="Your Profile Icon"
          />
          <h4>{props.currentUser}</h4>
        </div>
      </div>
    </div>
  );
}

export default Chatlist;
