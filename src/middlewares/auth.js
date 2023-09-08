import jwt from "jsonwebtoken";
import secretKey from "../config/secretKey.js";

async function auth(req, res, next) {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        try{
            jwt.verify(token, secretKey, (error, decoded) => {
                if (error) {
                    return res.status(401).json({error: "Token invalid"})
                }
                req.isAuthenticated = true
                req.userId = decoded.id
                res.setHeader('Content-Type', 'application/json')
                return next()
            })

        } catch (error) {
            return res.status(403).send(error)
        }
    } else {
        res.status(401).json({ message: 'Missing'})
    }
}

export default auth