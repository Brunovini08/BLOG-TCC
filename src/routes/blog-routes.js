import {Router} from "express";
import blogController from "../controllers/blog-controller.js";
import auth from "../middlewares/auth.js";

const routerBlog = Router()

routerBlog.post("/create", auth, blogController.createBlog)
routerBlog.get("/get", auth, blogController.getBlogs)
routerBlog.get("/get/:id", auth, blogController.getBlogId)
routerBlog.put("/put/:id", auth, blogController.putBlog)
routerBlog.delete("/delete/:id", auth, blogController.deleteBlog)
routerBlog.put("/:id", auth, blogController.postCommentsBlog)
routerBlog.get("/:id", auth, blogController.commentGetBlog)
routerBlog.put("/like/:id", auth, blogController.likeInPost)
routerBlog.get("/like/:id", auth, blogController.likeGetBlog)
routerBlog.put("/unlike/:id", auth, blogController.unlikeInPost)

export default routerBlog