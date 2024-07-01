import multer from 'multer';
import { ErrorHandler } from '../utils/error';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + `/resources/uploads/${req.params.dist}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +  file.originalname);
    },
});

const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedFiles = process.env.ALLOWED_FILETYPES;

        if(!allowedFiles.includes(file.mimetype)){
            cb(new ErrorHandler(400, 'Invalid mimetype'));
        } else {
            cb(null, true);
        }
    },
    limits: { fileSize: 1024 * 1024 * 3 }
}).single("file");

const uploadFiles = multer({
    storage: storage
}).array("files");