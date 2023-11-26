import {Router} from "express";
import blogController from "../controllers/blog-controller.js";
import auth from "../middlewares/auth.js";

const routerBlog = Router()

routerBlog.post("/create/:id", auth, blogController.createBlog)
routerBlog.get("/get", blogController.getBlogs)
routerBlog.get("/get/:id", blogController.getBlogId)
routerBlog.put("/put/:id", auth, blogController.putBlog)
routerBlog.delete("/delete/:id", auth, blogController.deleteBlog)
routerBlog.put("/commentPost/:id", auth, blogController.postCommentsBlog)
routerBlog.get("/getComments/:id", blogController.getCommentsPost)
routerBlog.put("/like/:Blogid", auth, blogController.likeInPost)
routerBlog.get("/getLikes/:blogId", auth, blogController.likeGetBlog)
routerBlog.get("/getBlogUser/:id", blogController.getBlogUser)
routerBlog.get("/getBlogTitle/:title", blogController.getBlogTitle)

export default routerBlog