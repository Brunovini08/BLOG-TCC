import express from "express"
import dbConnection from "./config/dbConnection.js";
import router from "./routes/user-routes.js";
import routerBlog from "./routes/blog-routes.js";

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api/user", router)
app.use("/api/blog", routerBlog)

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log("Servidor rodando na porta 3000")
    })
}).catch((error) => {
    console.log(error)
})