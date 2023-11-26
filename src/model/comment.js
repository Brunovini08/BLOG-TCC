import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        require:  true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Blog"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment