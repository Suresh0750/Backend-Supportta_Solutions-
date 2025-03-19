import multer from "multer";


const storage = multer.memoryStorage();


const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    try {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type"));
        }
    } catch (error) {
        console.error("File upload error:", error);
        return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Something went wrong during file validation"));
    }
};


export const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // * 2MB File Size Limit
    fileFilter
});
