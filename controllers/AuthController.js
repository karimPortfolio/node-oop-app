import { prisma } from "../database/prisma.js";
import { Auth } from "../services/Auth.js";
import { AuthToken } from "../utils/AuthToken.js";
import bcrypt from "bcrypt";

class AuthController {
  static async register(req, res) {
    const { email, password, confirmPassword, name } = req.body;
    if (!email || !password || !confirmPassword || !name) {
      return res.status(422).json({
        message: "Email, name and password are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(422).json({
        message: "Passwords do not match",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = AuthToken.createToken(user);

      const cookieOptions = {
        secure: true,
        httpOnly: true,
        sameSite: true,
      };

      return res.cookie("access_token", token, cookieOptions).status(200).json({ user });

    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        message: "Email and password  are required",
      });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(403).json({
          message: "Email or password invalid",
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(403).json({
          message: "Email or password invalid",
        });
      }

      const token = AuthToken.createToken(user);

      const cookieOptions = {
        secure: true,
        httpOnly: true,
        sameSite: true,
      };

      return res.cookie("access_token", token, cookieOptions).status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

  static async me(req, res) {
    const user = Auth.user(req);
    return res.status(200).json({ user });
  }

  static async logout(req, res) {
    await Auth.logout(req, res);
    return res.sendStatus(200);
  }
}

export { AuthController };
