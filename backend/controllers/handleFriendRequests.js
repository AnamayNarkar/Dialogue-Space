import User from "../mongoDB/models/usermodel.js";
import chatsWithFriendsSchema from "../mongoDB/schemas/chatsWithFriendsSchema.js";
import { io, usersAndSockets } from "../server.js";

function handleError(res, error) {
    res.send("Internal Server Error");
}

async function sendFriendRequest(req, res) {
    const { sender, receiver } = req.body;
    try {
        
        const requestSenderObject = await User.findOne({ username: sender })
        const requestReceiverObject = await User.findOne({ username: receiver })

        if(!requestReceiverObject){
            res.send("User not found");
            return;
        }

        if(requestSenderObject.friendList.some(friend => friend.username === receiver)){
            res.send("You are already friends with this user");
            return;
        }

        if(requestSenderObject.friendRequestsSent.some(request => request.username === receiver)){
            res.send("You have already sent a friend request to this user");
            return;
        }

        const updatedSender = await User.findOneAndUpdate(
            { username: sender },
            { $push: { friendRequestsSent: { username: requestReceiverObject.username, _id: requestReceiverObject._id } } },
            { new: true }
        );

        const updatedReceiver = await User.findOneAndUpdate(
            { username: receiver },
            { $push: { friendRequestsReceived: { username: requestSenderObject.username, _id: requestSenderObject._id } } },
            { new: true }
        );

        const senderSocket = usersAndSockets[sender];

        if (senderSocket) {
            io.to(senderSocket).emit("youSentAFriendRequest", updatedSender.friendRequestsSent);
        }

        const receiverSocket = usersAndSockets[receiver];   

        if (receiverSocket) {
            io.to(receiverSocket).emit("youHaveAFriendRequest", updatedReceiver.friendRequestsReceived);
        }

        res.send("Friend request sent successfully");
    } catch (err) {
        handleError(res, err);
    }
}

async function acceptFriendRequest(req, res) {
    const { friendRequestInfo, acceptorInfo } = req.body;
    const { senderUsername, senderUserId } = friendRequestInfo;
    const { acceptorUsername, acceptorUserId } = acceptorInfo;

    try {
        const senderObject = await User.findOne({ username: senderUsername });
        const acceptorObject = await User.findOne({ username: acceptorUsername });

        const updatedSender = await User.findOneAndUpdate(
            { username: senderUsername },
            {
                $push: { 
                    friendList: { username: acceptorObject.username, _id: acceptorObject._id },
                    chatsWithFriends : { friend: {
                        username : acceptorObject.username,
                        _id : acceptorObject._id
                    }, messages: [] }
                },
                $pull: {
                    friendRequestsSent: { username: acceptorObject.username, _id: acceptorObject._id },
                    friendRequestsReceived: { username: acceptorObject.username, _id: acceptorObject._id }
                }
            },
            { new: true }
        );

        const updatedAcceptor = await User.findOneAndUpdate(
            { username: acceptorUsername },
            {
                $push: { 
                    friendList: { username: senderObject.username, _id: senderObject._id },
                    chatsWithFriends : { friend: {
                        username : senderObject.username,
                        _id : senderObject._id
                    }, messages: [] }
                },
                $pull: {
                    friendRequestsSent: { username: senderObject.username, _id: senderObject._id },
                    friendRequestsReceived: { username: senderObject.username, _id: senderObject._id }
                }
            },
            { new: true }
        );

        const senderSocket = usersAndSockets[senderObject.username];
        const acceptorSocket = usersAndSockets[acceptorObject.username];

        const updatedSenderData = {
            friendList: updatedSender.friendList,
            friendRequestsSent: updatedSender.friendRequestsSent,
            friendRequestsReceived: updatedSender.friendRequestsReceived,
            chatsWithFriends: updatedSender.chatsWithFriends[updatedSender.chatsWithFriends.length - 1]
        };

        const updatedAcceptorData = {
            friendList: updatedAcceptor.friendList,
            friendRequestsSent: updatedAcceptor.friendRequestsSent,
            friendRequestsReceived: updatedAcceptor.friendRequestsReceived,
            chatsWithFriends: updatedAcceptor.chatsWithFriends[updatedAcceptor.chatsWithFriends.length - 1]
        };

        if (senderSocket) {
            io.to(senderSocket).emit("yourFriendRequestWasAccepted", updatedSenderData);
        }

        if (acceptorSocket) {
            io.to(acceptorSocket).emit("youAcceptedAFriendRequest", updatedAcceptorData);
        }

        res.send("Friend request accepted successfully");
    } catch (err) {
        handleError(res, err);
    }
}

async function rejectFriendRequest(req, res) {
    const { friendRequestInfo, rejectorInfo } = req.body;
    const { sendersId, senderUsername } = friendRequestInfo;
    const { rejectorUsername, rejectorUserId } = rejectorInfo;

    try {
        const senderObject = await User.findOne({ _id: sendersId });
        const rejectorObject = await User.findOne({ _id: rejectorUserId });

        const updatedSender = await User.findOneAndUpdate(
            { _id: sendersId },
            {
                $pull: { friendRequestsSent: { username: rejectorObject.username, _id: rejectorObject._id } }
            },
            { new: true }
        );

        const updatedRejector = await User.findOneAndUpdate(
            { _id: rejectorUserId },
            {
                $pull: { friendRequestsReceived: { username: senderObject.username, _id: senderObject._id } }
            },
            { new: true }
        );

        const senderSocket = usersAndSockets[senderObject.username];
        const rejectorSocket = usersAndSockets[rejectorObject.username];

        const updatedSenderData = {
            friendRequestsSent: updatedSender.friendRequestsSent
        };

        const updatedRejectorData = {
            friendRequestsReceived: updatedRejector.friendRequestsReceived
        };

        if (senderSocket) {
            io.to(senderSocket).emit("yourFriendRequestWasRejected", updatedSenderData);
        }

        if (rejectorSocket) {
            io.to(rejectorSocket).emit("youRejectedAFriendRequest", updatedRejectorData);
        }

        res.send("Friend request rejected successfully");
    } catch (err) {
        handleError(res, err);
    }
}


export { acceptFriendRequest, rejectFriendRequest, sendFriendRequest };