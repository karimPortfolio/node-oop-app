import AWS from "aws-sdk";
import { ServicesConfig } from "../config/services.js";

class Storage {
    
    static awsS3Service()
    {
        const {
            accessKeyId,
            secretAccessKey,
            region
        } = ServicesConfig.getAwsServiceConfig();

        const S3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region
        });

        return S3;
    }


    static put(file, requester)
    {
        const { bucketName } = ServicesConfig.getAwsServiceConfig();
        const s3 = this.awsS3Service();
        const params = {
            Bucket:  bucketName,
            Key: `${requester}/${file.originalname}`,
            Body: file.buffer
        };

        return s3.upload(params).promise();
    }

    static async get(key)
    {
        const { bucketName } = ServicesConfig.getAwsServiceConfig();
        const s3 = this.awsS3Service();
        const params = {
            Bucket:  bucketName,
            Key: key
        };

        const object = await s3.getObject(params).promise();
        return object;
    }

    static getUrl(key)
    {
        const { bucketName, region } = ServicesConfig.getAwsServiceConfig();
        const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

        return url;
    }

}



export { Storage }