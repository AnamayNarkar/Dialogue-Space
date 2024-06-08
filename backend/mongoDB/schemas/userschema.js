import mongoose from "mongoose";
import chatsWithFriendsSchema from "./chatsWithFriendsSchema.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
        type: [String],
        default: [],
    },
    friendRequestsReceived: {
        type: [String],
        default: [],
    },
    chatsWithFriends: [chatsWithFriendsSchema],
});

export default userSchema;