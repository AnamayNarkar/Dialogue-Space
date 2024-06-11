import User from "../mongoDB/models/usermodel.js";

async function sendLatestUserData(req, res) {

    const { username, email } = req.query;

    const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (user) {
        res.send(user);
    } else {
        res.send({ message: "User not found" });
    }
}

export { sendLatestUserData };