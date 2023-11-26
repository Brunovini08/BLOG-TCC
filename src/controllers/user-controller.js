import User from "../model/user.js";
import bcrypt from "bcrypt"
import createToken from "../middlewares/createToken.js"
import jwt from "jsonwebtoken";
import Blog from "../model/blog.js";
import nodemailer from "nodemailer";

class userController {
    static async register(req, res) {
        try {
            const email = req.body.email
            const existingUser = await User.findOne({ email: email })
            if (existingUser) {
                res.setHeader("Content-Type", "application/json")
                return res.status(400).json({ error: "Usuario ja cadastrado" })
            }
            if (req.body.password.length < 6) {
                res.setHeader("Content-Type", "application/json")
                return res.status(400).json({ error: "Senha muito curta, minimo 6 caracteres" })
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
                name: name,
                email: email,
                id: user.id
            })
        } catch (error) {
            res.status(400)
            console.log(error)
        }
    }

    static async getAllUsers(req, res) {
        const users = await User.find().populate("blogs")
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(users)
    }

    static async login(req, res) {
        try {
            const email = req.body.email
            if (req.body.password && email) {
                const user = await User.findOne({ email: email })
                if (user) {
                    const veryPass = await bcrypt.compare(req.body.password, user.password)
                    if (veryPass) {
                        user.password = undefined
                        res.setHeader("Content-Type", "application/json")
                        return res.status(200).json({
                            user,
                            token: createToken({ id: user.id })
                        })
                    } else {
                        res.setHeader("Content-Type", "application/json")
                        return res.status(400).send({ error: "Senha incorreta" })
                    }
                } else {
                    res.setHeader("Content-Type", "application/json")
                    return res.status(400).json({ error: "Email não cadastrado" })
                }
            }
            res.setHeader("Content-Type", "application/json")
            res.status(400).json({ error: "Email ou senha não informados" })
        } catch (error) {
            res.status(500).json(error)
        }


    }

    static async modUser(req, res) {
        if (req.isAuthenticated) {
            const id = req.params.id
            const data = req.body
            const oldUser = await User.findById({ _id: id })
            if (!oldUser) {
                res.setHeader("Content-Type", "application/json")
                return res.status(400).json({ error: "Usuario não encontrado" })
            }
            
            const user = await User.findByIdAndUpdate(
                { _id: id },
                {
                    $set: {
                        name: data.name,
                        biografy: data.biografy,
                        image: data.image,
                        localization: data.localization
                    }
                },
                { new: true }
            )
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json({ user })
        }
    }


    static async forgetPass(req, res) {
        const data = req.body
        try {
            const oldUser = await User.findOne({ email: data.email })
            if (!oldUser) {
                return res.json({ error: "Usuario não encontrado" })
            }

            const secret = oldUser.password + process.env.SECRET_KEY

            const token = jwt.sign({ id: oldUser._id }, secret, {
                expiresIn: "5m"
            })


            const smtp = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "tccams2023@gmail.com",
                    pass: "ovjhcsvswvywykrz"
                }
            })

            const mailOptions = {
                from: {
                    name: "TCC AMS",
                    address: "tccams2023@gmail.com"
                },
                to: oldUser.email,
                subject: "Link para resetar sua senha",
                text: `http://localhost:5173/resetpassword/${oldUser.id}/${token}`
            }

            smtp.sendMail(mailOptions, (error, response) => {
                if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json("Email send")
                }
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async resetPass(req, res) {
        const id = req.params.id
        const token = req.params.token
        const data = req.body
        const oldUser = await User.findById({ _id: id })

        if (!oldUser) {
            return res.json("User not exist")
        }

        const secret = oldUser.password + process.env.SECRET_KEY

        try {
            const verify = jwt.verify(token, secret)
            if (verify) {
                const newPassword = await bcrypt.hash(data.password, 10)
                const user = await User.findByIdAndUpdate({ _id: id }, { $set: { password: newPassword } })
                return res.status(200).json("Password reset")
            }
            return res.status(400).json("Token invalid")
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async postGetUser(req, res) {
        try {
            const userId = req.params.id
            const user = await User.findById({ _id: userId }).populate("blogs")
            res.setHeader("Content-Type", "application/json")
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }



}

export default userController