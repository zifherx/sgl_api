import multer from 'multer'
import S3 from 'aws-sdk/clients/s3'
import path from 'path'
import multerS3 from 'multer-s3'
import { nanoid } from 'nanoid'
import 'dotenv/config'

const accessClient = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
};

// console.log(accessClient);

const s3 = new S3(accessClient);

const storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        let alternativo = new Date().getTime() + path.extname(file.originalname);
        // let campo = nanoid() + path.extname(file.originalname);
        cb(null, alternativo);
    }
});

const upload = multer({ storage });

export default upload;