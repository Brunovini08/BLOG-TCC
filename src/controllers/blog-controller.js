import Blog from "../model/blog.js";
import Comment from "../model/comment.js";
import Like from "../model/like.js";
import * as buffer from "buffer";


class blogController {
    static async createBlog(req, res) {
        try {
            const {title, description, comments} = req.body
            const createBlog = await Blog.create({
                title: title,
                description: description,
                user: req.userId
            })

            res.status(201).json(createBlog)
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
            const blog = await Blog.findById({_id: blogId})
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json(blog)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async putBlog(req, res) {
        try {
            const blogId = req.params.id
            const {title, description} = req.body
            const blogPut = await Blog.findByIdAndUpdate({_id: id}, {$set: {title, description}})
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json(blogPut)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async deleteBlog(req, res) {
        try {
            const blogId = req.params.id
            const blogDelete = await Blog.findByIdAndDelete({_id: id})
            res.setHeader("Content-Type", "application/json")
            return res.status(200).send("Blog deletado com sucesso")
        } catch (error) {
            res.status(400).send(error)
        }
    }

    static async postCommentsBlog(req, res) {
        const {text} = req.body
        const blogId = req.params.id
        const comment = await Comment.create({text: text})

        try {
            await comment.save()
            try {
                await Blog.findByIdAndUpdate(blogId, {
                    $push: {comments: comment._id}
                })
                res.status(200).json(comment)
            } catch (error) {
                res.status(400).json(error)
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async commentGetBlog(req, res) {
        try {
            const blogId = req.params.id
            const blogComment = await Blog.findById({_id: blogId}).populate("comments")
            res.status(200).json({blogComment})
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async unlikeInPost(req, res) {
        const blogId = req.params.id
        const verifyBlog = await Blog.findOne({_id: blogId})
        if (verifyBlog) {
            const like = await Like.findOne({userId: req.userId})
            if (like) {
                try {
                    await Blog.findByIdAndUpdate(blogId, {
                        $pull: {like: like._id}
                    })
                    res.setHeader("Content-Type", "application/json")
                    return res.status(200).json("Voce descurtiu esse post")
                } catch (error) {
                    res.status(400).json(error)
                }
            }

        }
    }

    static async likeInPost(req, res) {
        const blogId = req.params.id
        const verifyBlog = await Blog.findOne({_id: blogId})
        if (verifyBlog) {
            const like = await Like.findOne({userId: req.userId})
            if (!like) {
                const createLike = await Like.create({blogId: blogId, userId: req.userId})
                try {
                    await createLike.save()
                    try {
                        await Blog.findByIdAndUpdate(blogId, {
                            $push: {like: req.userId}
                        })
                        res.status(200).json("Voce curtiu esse post")
                    } catch (error) {
                        res.status(400).json(error)
                    }
                } catch (error) {
                    res.status(400).json(error)
                }
                res.status(400).json("Voce ja curtiu esse post")
            }
        }
        res.setHeader("Content-Type", "application/json")
        return res.status(400).json("Blog nao encontrado")
    }
    static async likeGetBlog(req, res) {
        try {
            const blogId = req.params.id
            const blogComment = await Blog.findById({_id: blogId}).populate("like")
            res.status(200).json({blogComment})
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async unlikeBlog(req, res) {

    }
}

export default blogController