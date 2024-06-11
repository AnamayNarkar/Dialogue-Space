import User from "../mongoDB/models/usermodel.js";
import { io, usersAndSockets } from "../server.js";

async function acceptFriendRequest(req, res) {

    const { friendRequestName, currentUser } = req.body;
    const senderSocket = usersAndSockets[currentUser];
    const receiverSocket = usersAndSockets[friendRequestName];

    //update acceptors friend list and friend requests received list

    try {

        const updatedCurrentUser = await User.findOneAndUpdate(
            { username: currentUser },
            { $push: { friendList: friendRequestName } },
            { new: true }
        );

        const updatedUser = await User.findOneAndUpdate(
            { username: currentUser },
            { $pull: { friendRequestsReceived: friendRequestName } },
            { new: true }
        );

        if (updatedUser) {
            const updatedData = {
                friendList: updatedUser.friendList,
                friendRequestsReceived: updatedUser.friendRequestsReceived
            };

            res.send(updatedData);

            if (usersAndSockets[currentUser]) {
                io.to(usersAndSockets[currentUser]).emit("friendRequestAccepted", updatedData);
            }

        } else {
            console.error("User not found");
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

    //update senders friend list

    try {

        const updatedFriendRequestSender = await User.findOneAndUpdate({
            username: friendRequestName
        }, {
            $push: { friendList: currentUser }
        }, {
            new: true
        })

        if (updatedFriendRequestSender) {
            const updatedData = {
                friendList: updatedFriendRequestSender.friendList
            }

            if (usersAndSockets[friendRequestName]) {
                io.to(usersAndSockets[friendRequestName]).emit("yourFriendRequestWasAccepted", updatedData);
            }

        } else {
            console.error("User not found");
            res.status(404).send("User not found");
        }

    } catch (err) {
        console.log(err);
    }

}

async function rejectFriendRequest(req, res) {
    const { friendRequestName, currentUser } = req.body;

    const senderSocket = usersAndSockets[currentUser];
    const receiverSocket = usersAndSockets[friendRequestName];

    //update rejectors friend requests received list

    try {

        const updatedUser = await User.findOneAndUpdate(
            { username: currentUser },
            { $pull: { friendRequestsReceived: friendRequestName } },
            { new: true }
        );

        if (updatedUser) {
            res.send(updatedUser.friendRequestsReceived);
            io.to(usersAndSockets[currentUser]).emit("friendRequestRejected", updatedUser.friendRequestsReceived);
        } else {
            console.error("User not found");
            res.status(404).send("User not found");
        }

    } catch (err) {
        console.log(err);
    }

    try {

        // const updatedFriendRequestSender = await User.findOneAndUpdate({
        //     username: friendRequestName
        // }, {
        //     $pull: { friendList: currentUser }
        // }, {
        //     new: true
        // })

        // if (updatedFriendRequestSender) {
        //     const updatedData = {
        //         friendList: updatedFriendRequestSender.friendList
        //     }

        //     if (usersAndSockets[friendRequestName]) {
        //         io.to(usersAndSockets[friendRequestName]).emit("YourfriendRequestWasRejected", updatedData);
        //     }

        // } else {
        //     console.error("User not found");
        //     res.status(404).send("User not found");
        // }

    }catch(err){
        console.log(err);
    
    }

}

export { acceptFriendRequest, rejectFriendRequest };