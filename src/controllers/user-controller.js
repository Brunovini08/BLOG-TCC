import User from "../model/user.js";
import bcrypt from "bcrypt"
import createToken from "../middlewares/createToken.js"

class userController {
    static async register(req, res) {
        try {
            const email = req.body.email
            const existingUser = await User.findOne({email: email})
            if (existingUser) {
                res.setHeader("Content-Type", "application/json")
                res.status(400).send("Usuario ja cadastrado")
            }
            const name = req.body.name
            const password = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({
                name: name,
                email: email,
                password: password
            })
            await user.save()
            user.password = undefined
            res.setHeader("Content-Type", "application/json")
            res.status(201).json({
                user,
                token: createToken({id: user.id})
            })
        } catch (error) {
            res.status(400)
            console.log(error)
        }
    }

    static async login(req, res) {
        const errorMessages = {
            userNotFound: "User not found",
            invalidCredentials: "Invalid credentials"
        }
        try {
            const email = req.body.email
            if (req.body.password && email) {
                const user = await User.findOne({email: email})
                if (user) {
                    const veryPass = await bcrypt.compare(req.body.password, user.password)
                    if (veryPass) {
                        user.password = undefined
                        res.setHeader("Content-Type", "application/json")
                        return res.status(200).send("Login feito com sucesso")

                    } else {
                        res.setHeader("Content-Type", "application/json")
                        return res.status(400).send("Password incorrect or user is not register")
                    }
                } else {
                    res.setHeader("Content-Type", "application/json")
                    return res.status(400).send("Email incorrect or email is not register")
                }
            }
            res.setHeader("Content-Type", "application/json")
            res.status(400).send("Email or password not information")
        } catch (error) {
            res.status(500).json(error)
        }


    }

    static async modUser(req, res) {
        if (req.isAuthenticated) {
            const id = req.params.id
            const user = await User.findByIdAndUpdate({_id: id}, {$set: req.body})
            if (user) {
                res.setHeader("Content-Type", "application/json")
                return res.status(200).json(user)
            }
            res.status(400).json("User is not found")
        } else {
            res.status(401).send("You not authorization for acess is router")
        }
    }

}

export default userController