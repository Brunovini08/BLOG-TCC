import mongoose, {Schema} from "mongoose";
import * as stream from "stream";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    biografy: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    comments: []
})

const User = mongoose.model("User", userSchema)

export default User