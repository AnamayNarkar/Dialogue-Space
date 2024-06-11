import { io, usersAndSockets } from "../server.js";
import User from "../mongoDB/models/usermodel.js";

async function sendUpdatesToClient(sender, receiver, message, time, date) {
    
    const messageObj = { sender, receiver, message, time, date };

    const user = await User.findOne({
        'chatsWithFriends.messages': {
            $elemMatch: {
                sender: messageObj.sender,
                receiver: messageObj.receiver,
                message: messageObj.message,
                time: messageObj.time,
                date: messageObj.date
            }
        }
    });

    let messageObjFromMongo;
    
    if (user) {
        for (const friendChat of user.chatsWithFriends) {
            const foundMessage = friendChat.messages.find(msg =>
                msg.sender === messageObj.sender &&
                msg.receiver === messageObj.receiver &&
                msg.message === messageObj.message &&
                msg.time === messageObj.time &&
                msg.date === messageObj.date
            );
            if (foundMessage) {
                messageObjFromMongo = foundMessage;
                break;
            }
        }
    }

    const senderSocket = usersAndSockets[sender];
    const receiverSocket = usersAndSockets[receiver];

    if (senderSocket) {
        io.to(senderSocket).emit('newMessage', messageObjFromMongo);
    }

    if (receiverSocket) {
        io.to(receiverSocket).emit('newMessage', messageObjFromMongo);
    }
}

export { sendUpdatesToClient };
