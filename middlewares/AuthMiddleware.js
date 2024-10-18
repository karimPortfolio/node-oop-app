import { AuthCookie } from "../utils/AuthCookie.js";
import { AuthToken } from "../utils/AuthToken.js";

class AuthMiddleware {
  static async authorization(req, res, next) {

    if (!req.headers.cookie) return res.sendStatus(401);

    try {
      const token = AuthCookie.getCookieValue(req.headers.cookie, "access_token");
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
