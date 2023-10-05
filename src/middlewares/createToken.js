import jwt from "jsonwebtoken"
import secretKey from "../config/secretKey.js";

function createToken(params = {}) {
    return jwt.sign(params, process.env.SECRET_KEY, {expiresIn: '3d'})
}

export default createToken