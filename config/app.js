
class AppConfig
{

    static getAppPortConfig()
    {
        return process.env.APP_PORT || 3000;
    }


}


export { AppConfig };
