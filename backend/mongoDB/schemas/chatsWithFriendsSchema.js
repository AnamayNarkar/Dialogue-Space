import mongoose from "mongoose";
import messageSchema from "./messageschema.js";

const chatsWithFriendsSchema = new mongoose.Schema({
    friend: {
        username: {
            type: String,
            required: true,
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    },
    messages: [messageSchema],
});

export default chatsWithFriendsSchema;
