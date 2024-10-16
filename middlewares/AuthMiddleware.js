import { AuthToken } from "../utils/AuthToken.js";

class AuthMiddleware {
  static async authorization(req, res, next) {
    if (!req.headers.authorization) return res.sendStatus(401);
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return res.sendStatus(401);

      const user = await AuthToken.verifyToken(token);
      if (!user) return res.sendStatus(401);
      req.user = user;

      return next();
    } catch (err) {
      console.log(err);
      return res.sendStatus(401);
    }
  }
}

export { AuthMiddleware };
