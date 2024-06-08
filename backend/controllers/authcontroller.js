import User from "../mongoDB/models/usermodel.js";

async function signUp(req, res) {
    const { name, email, username, password } = req.body;
    console.log(req.body);

    try {
        const newUser = new User({
            name,
            email,
            username,
            password
        });

        await newUser.save();
        res.send({
            message: "User saved successfully"
        });
    } catch (error) {
        res.send({
            message: "error creating user"
        });
    }
}

async function login(req, res) {
    const { usernameoremail, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ $or: [{ username: usernameoremail }, { email: usernameoremail }] });
    if (user) {
        if (user.password === password) {
            const userData = user;
            res.send({
                data: userData,
                message: "Login successful"
            });
        } else {
            res.send({
                message: "Incorrect password"
            });
        }
    } else {
        res.send({
            message: "User not found"
        });
    }
}

async function updateMessages(req, res) {
    const { sender, receiver, message, time, date } = req.body;
    try {
        const user = await User.findOne({ username: sender });
        const friend = await User.findOne({ username: receiver });

        let chat = user.chatsWithFriends.find(chat => chat.friendUserName === receiver);
        if (!chat) {
            chat = { friendUserName: receiver, messages: [] };
            user.chatsWithFriends.push(chat);
        }

        let friendChat = friend.chatsWithFriends.find(chat => chat.friendUserName === sender);
        if (!friendChat) {
            friendChat = { friendUserName: sender, messages: [] };
            friend.chatsWithFriends.push(friendChat);
        }

        const messageObj = {
            sender,
            receiver, 
            message,
            time,
            date
        };

        chat.messages.unshift(messageObj);
        friendChat.messages.unshift(messageObj);

        await user.save();
        await friend.save();

        res.send({ message: "Message updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Error updating messages" });
    }
}

export { signUp, login, updateMessages };   