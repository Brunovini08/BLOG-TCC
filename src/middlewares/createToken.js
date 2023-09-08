import jwt from "jsonwebtoken"
import secretKey from "../config/secretKey.js";

function createToken(params = {}) {
    return jwt.sign(params, secretKey, {expiresIn: '3d'})
}

export default createToken