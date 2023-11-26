import jwt from "jsonwebtoken"

function createToken(params = {}) {
    return jwt.sign(params, process.env.SECRET_KEY, {expiresIn: '3d'})
}

export default createToken