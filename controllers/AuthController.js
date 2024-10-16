import { prisma } from "../database/prisma.js";
import { AuthToken } from "../utils/AuthToken.js";
import bcrypt from 'bcrypt';

class AuthController {

    static async register(req, res) {

        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(422).json({
                message: 'Email, name and password are required'
            });
        }

        try
        {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    id,
                    name,
                    email,
                    password: hashedPassword
                }
            });

            const token =  AuthToken.createToken({
                email,
                name
            });

            return res.status(201).json({
                token,
                user
            });
        }
        catch(err)
        {
            console.log(err);
            return res.sendStatus(400);
        }
    }

    static async login(req, res) {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                message: 'Email and password  are required'
            });
        }
        try
        {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {   
                return res.status(403).json({
                    message: 'Email or password invalid'
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(403).json({
                    message: 'Email or password invalid'
                });
            }

            const token =  AuthToken.createToken(user);

            return res.status(200).json({
                token,
                user
            });

        }
        catch(err)
        {
            console.log(err);
            return res.sendStatus(400);
        }
    }

}


export { AuthController };
