import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isTrue: {
        type: Boolean,
        default: false
    }
})

const Like = mongoose.model("Like", likeSchema)

export default Like