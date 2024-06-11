import User from "../mongoDB/models/usermodel.js";
import { io } from "../server.js";

async function signUp(req, res) {
    const { name, email, username, password } = req.body;

    try {
        const newUser = new User({ name, email, username, password });
        await newUser.save();

        const userData = await User.findOne({
            $or: [{ username: username }, { email:email }],
        });

        res.send({ data: userData, message:"User saved successfully" });
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