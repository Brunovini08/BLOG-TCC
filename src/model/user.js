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
    createdAt: {
        type: Date,
        default: new Date()
    },
    localization: {
        type: String
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    image: {
        type: String
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

const User = mongoose.model("User", userSchema)

export default User