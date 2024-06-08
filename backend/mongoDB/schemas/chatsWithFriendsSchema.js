import mongoose from "mongoose";
import messageSchema from "./messageschema.js";

const chatsWithFriendsSchema = new mongoose.Schema({
    friendUserName: String,
    messages: [messageSchema],
});

export default chatsWithFriendsSchema;