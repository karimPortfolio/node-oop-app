
class Auth
{

    static check(req, res)
    {
        return !!req.user;
    }

    static user(req, res)
    {
        return req.user;
    }

    static logout(req, res)
    {
        req.user = null;
        res.clearCookie("access_token");
        return res.clearCookie("access_token");
    }

}


export { Auth }