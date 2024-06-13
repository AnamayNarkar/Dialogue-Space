import User from "../mongoDB/models/usermodel.js";
import { io } from "../server.js";

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function signUp(req, res) {
    const { name, email, username, password } = req.body;

    try {
        let user = await User.findOne({ username: username });
        if (user) {
            res.send({ message: "User already exists with this username" });
            return;
        }

        user = await User.findOne({ email: email });
        if (user) {
            res.send({ message: "User already exists with this email" });
            return;
        }

        const newUser = await User.create({
            name: name,
            email: email,
            username: username,
            password: password,
            friendList: [],
            friendRequestsReceived: [],
            friendRequestsSent: [],
            chatsWithFriends: []
        });

        res.send({ data: newUser, message: "User saved successfully" });

    } catch (error) {
        res.send({ message: "Error creating user" });
    }
}


async function login(req, res) {
    const { usernameoremail, password } = req.body;

    const user = await User.findOne({
        $or: [{ username: usernameoremail }, { email: usernameoremail }],
    });

    if (user) {
        if (user.password === password) {
            const userData = user;
            res.send({ data: userData, message: "Login successful" });
        } else {
            res.send({ message: "Incorrect password" });
        }
    } else {
        res.send({ message: "User not found" });
    }
}

export { signUp, login };