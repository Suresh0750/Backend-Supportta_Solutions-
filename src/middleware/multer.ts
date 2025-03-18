import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // * Limit file size to 2MB
    fileFilter
});
