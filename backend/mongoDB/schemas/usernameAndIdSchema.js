import mongoose from "mongoose";

const usernameAndIdSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

export default usernameAndIdSchema;
