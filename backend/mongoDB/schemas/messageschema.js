import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: { 
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

export default messageSchema;
