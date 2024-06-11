import User from "../mongoDB/models/usermodel.js";
import { sendUpdatesToClient } from "./sendUpdatesToClient.js";
import { ObjectId } from "mongodb";

async function updateMessages(req, res) {
  const { sender, receiver, message, time, date, friendId } = req.body;
  try {
    let chat, friendChat;
    const user = await User.findOne({ username: sender });
    const friend = await User.findOne({ username: receiver });

    chat = user.chatsWithFriends.find(
      (chat) => chat.friend.username === receiver
    );
    console.log(1);
    if (!chat) {
      chat = { friend: { username: receiver, _id: friendId }, messages: [] };
      await User.updateOne(
        { username: sender },
        { $push: { chatsWithFriends: chat } }
      );
    }
    console.log(2);

    friendChat = friend.chatsWithFriends.find(
      (chat) => chat.friend.username === sender
    );
    console.log(3);
    if (!friendChat) {
      friendChat = {
        friend: { username: sender, _id: user._id },
        messages: [],
      };
      await User.updateOne(
        { username: receiver },
        { $push: { chatsWithFriends: friendChat } }
      );
    }
    console.log(4);

    const messageObj = { sender, receiver, message, time, date };
    await User.updateOne(
      { username: sender, "chatsWithFriends.friend.username": receiver },
      { $push: { "chatsWithFriends.$.messages": { $each: [messageObj], $position: 0 } } }
    );
    await User.updateOne(
      { username: receiver, "chatsWithFriends.friend.username": sender },
      { $push: { "chatsWithFriends.$.messages": { $each: [messageObj], $position: 0 } } }
    );
    console.log(5);

    console.log(6);
    res.send({ message: "Message updated successfully" });
    sendUpdatesToClient(sender, receiver, message, time, date);
  } catch (error) {
    res.send({ message: "Error updating message" });
  }
}

export { updateMessages };