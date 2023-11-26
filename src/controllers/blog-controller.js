import Blog from "../model/blog.js";
import Comment from "../model/comment.js";
import User from "../model/user.js";


class blogController {

    static async createBlog(req, res) {
        try {
            const { title, content, base64 } = req.body
            if (!title || !content || !base64) {
                res.setHeader("Content-Type", "application/json")
                return res.status(400).send("Preencha todos os campos")
            }
            const createBlog = await Blog.create({
                title: title,
                content: content,
                user: req.userId,
                image: base64
            })
            try {
                const user = await User.findByIdAndUpdate(req.userId, {
                    $push: { blogs: createBlog }
                })
                res.setHeader("Content-Type", "application/json")
                res.status(201).json({ user, createBlog })
            } catch (error) {
                res.status(400).json(error)
            }

        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async getBlogs(req, res) {
        try {
            const blogs = await Blog.find().populate("user")
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json(blogs)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async getBlogId(req, res) {
        try {
            const blogId = req.params.id
            const blog = await Blog.findById({ _id: blogId }).populate("user")
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json(blog)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async putBlog(req, res) {
        try {
            const blogId = req.params.id
            const { title, content, base64 } = req.body
            const blogUpdate = await Blog.findByIdAndUpdate({ _id: blogId }, {
                $set: {
                    title: title,
                    content: content,
                    image: base64
                }
            })
            res.setHeader("Content-Type", "application/json")
            return res.status(203).json(blogUpdate)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async deleteBlog(req, res) {
        try {
            const blogId = req.params.id
            const blogDelete = await Blog.findByIdAndDelete({ _id: blogId })
            const user = await User.findByIdAndDelete(blogId, {
                $pull: { blogs: blogId }
            })
            res.setHeader("Content-Type", "application/json")
            return res.status(200).send("Blog deletado com sucesso")
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async postCommentsBlog(req, res) {
        const { text } = req.body
        const blogId = req.params.id
        const userId = req.userId
        const comment = await Comment.create({
            text: text,
            blogId: blogId,
            userId: userId
        })

        try {
            await comment.save()
            try {
                await Blog.findByIdAndUpdate(blogId, {
                    $push: { comments: comment }
                })
                res.status(200).json(comment)
            } catch (error) {
                res.status(400).json(error)
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }


    static async getCommentsPost(req, res) {
        try {
            const blogId = req.params.id
            const comments = await Comment.find({ blogId: blogId }).populate("userId")
            res.status(200).json(comments)
        } catch (error) {
            res.status(400).json(error)
        }
    }



    static async likeInPost(req, res) {
        try {
            const blogId = req.params.Blogid
            const post = await Blog.findById({ _id: blogId }).populate("user")
            if (!post.like.includes(req.userId)) {
                await Blog.findByIdAndUpdate({ _id: blogId }, {
                    $push: { like: req.userId }
                })
                await User.findByIdAndUpdate({ _id: req.userId }, {
                    $push: { like: blogId }
                })
                res.setHeader("Content-Type", "application/json")
                return res.status(200).json(post)
            }
            await Blog.findByIdAndUpdate({ _id: blogId }, {
                $pull: { like: req.userId }
            })
            await User.findByIdAndUpdate({ _id: req.userId }, {
                $pull: { like: blogId }
            })
            res.setHeader("Content-Type", "application/json")
            return res.status(203).json(post)
        } catch (error) {
            console.log(error)
        }
    }

    static async likeGetBlog(req, res) {
        try {
            const blogLike = await Blog.findById({ _id: req.params.blogId }).populate("like")
            res.status(200).json(blogLike)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getBlogUser(req, res) {
        try {
            const id = req.params.id
            const blogUser = await User.findById({ _id: id }).populate("blogs")
            res.status(200).json(blogUser)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getBlogTitle(req, res) {
        try {
            const title = req.params.title
            const blog = await Blog.find({ title: new RegExp(title, "gi") })
            res.status(200).json(blog)
        } catch (error) {
            res.status(400).json(error)
        }
    }


}

export default blogController