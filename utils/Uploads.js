import multer from "multer";

class Uploads
{
    static uploadFile()
    {
        const storage = multer.memoryStorage();
        return multer({ storage: storage });
    }

}

export { Uploads };