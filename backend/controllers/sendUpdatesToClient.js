import { io ,usersAndSockets} from "../server.js";

async function sendUpdatesToClient(sender, receiver, message, time, date) {

    const messageObj = { sender, receiver, message, time, date };

    const senderSocket = usersAndSockets[sender];
    const receiverSocket = usersAndSockets[receiver];

    if (senderSocket) {
        io.to(senderSocket).emit('newMessage', messageObj);
    }

    if (receiverSocket) {
        io.to(receiverSocket).emit('newMessage', messageObj);
    }
}

export { sendUpdatesToClient };