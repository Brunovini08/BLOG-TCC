import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        require: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog