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
        res.send("User saved successfully");
    } catch (error) {
        res.send("error creating user");
    }
}

async function login(req,res) {
    const { usernameoremail, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ $or: [{ username: usernameoremail }, { email: usernameoremail }] });
    if (user) {
        if (user.password === password) {
            res.send("Login successful");
        } else {
            res.send("Incorrect password");
        }
    } else {
        res.send("User not found");
    }
}

export { signUp, login };