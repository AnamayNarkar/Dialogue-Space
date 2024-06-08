import mongoose from "mongoose";
import userSchema from "../schemas/userschema.js";

const User = mongoose.model("User", userSchema);

export default User;