

class AuthConfig
{
    static getJwtSecretKey()
    {
        // get random hash strings
        const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return process.env.JWT_SECRET_KEY ?? secret;
    }
}

export { AuthConfig };
