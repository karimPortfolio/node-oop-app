
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
        return res.sendStatus(200);
    }

}


export { Auth }