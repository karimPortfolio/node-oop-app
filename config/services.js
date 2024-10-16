
class ServicesConfig
{
    static getAwsServiceConfig()
    {
        return {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            bucketName: process.env.AWS_BUCKET_NAME,
            region: process.env.AWS_REGION
        }
    }
}

export { ServicesConfig };
