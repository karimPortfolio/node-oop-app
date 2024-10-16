import jwt from 'jsonwebtoken';
import { AuthConfig } from '../config/auth.js';

class AuthToken {

    static createToken(user) {
        // exclude password
        delete user.password;
        const secret = AuthConfig.getJwtSecretKey();
        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        return token;
    }

    static async verifyToken(token) {
        const secret = AuthConfig.getJwtSecretKey();
        if (!token) return false;
        const verified = await jwt.verify(token, secret);
        return verified;
    }
}

export { AuthToken }