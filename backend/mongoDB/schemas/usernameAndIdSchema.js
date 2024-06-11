import mongoose from "mongoose";

const usernameAndIdSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
});

export default usernameAndIdSchema;
