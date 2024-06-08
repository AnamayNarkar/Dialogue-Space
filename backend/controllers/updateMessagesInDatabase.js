import User from "../mongoDB/models/usermodel.js";
import { sendUpdatesToClient } from "./sendUpdatesToClient.js";

async function updateMessages(req, res) {
    const { sender, receiver, message, time, date } = req.body;

    try {
        const user = await User.findOne({ username: sender });
        const friend = await User.findOne({ username: receiver });

        let chat = user.chatsWithFriends.find(
            (chat) => chat.friendUserName === receiver
        );
        if (!chat) {
            chat = { friendUserName: receiver, messages: [] };
            user.chatsWithFriends.push(chat);
        }

        let friendChat = friend.chatsWithFriends.find(
            (chat) => chat.friendUserName === sender
        );
        if (!friendChat) {
            friendChat = { friendUserName: sender, messages: [] };
            friend.chatsWithFriends.push(friendChat);
        }

        const messageObj = { sender, receiver, message, time, date };

        chat.messages.unshift(messageObj);
        friendChat.messages.unshift(messageObj);

        await user.save();
        await friend.save();

        res.send({ message: "Message updated successfully" });

        sendUpdatesToClient( sender, receiver, message, time, date);
    }
    catch (error) {
        res.send({ message: "Error updating message" });
    }
}

export { updateMessages };