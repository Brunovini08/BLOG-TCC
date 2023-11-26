import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
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
            ref: "User"
        }
    ],
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog