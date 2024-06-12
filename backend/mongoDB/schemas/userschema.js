import mongoose from "mongoose";
import chatsWithFriendsSchema from "./chatsWithFriendsSchema.js";
import usernameAndIdSchema from "./usernameAndIdSchema.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    friendList: {
        type: [usernameAndIdSchema],
        default: [],
    },
    friendRequestsReceived: {
        type: [usernameAndIdSchema],
        default: [],
    },
    friendRequestsSent: {
        type: [usernameAndIdSchema],
        default: [],
    },
    chatsWithFriends:{ 
        type : [chatsWithFriendsSchema],
        default: [],
    }
});

export default userSchema;