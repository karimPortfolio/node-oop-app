import jwt from 'jsonwebtoken';

class AuthToken {

    static createToken(user) {
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return token;
    }

    static async verifyToken(token) {
        if (!token) return false;
        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return verified;
    }
}

export { AuthToken }