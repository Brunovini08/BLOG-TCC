import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: {type: String},
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Blog"
    }
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment