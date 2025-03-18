
import cloudinary from '../config/cloudinary';
import { ValidationError } from '../shared/CustomError';

export const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
    if (!file) throw new ValidationError('File is required');

    try {
        // * Convert file to base64 format
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64, {
            folder: 'user-profile',
            resource_type: 'auto',
            transformation: [{ width: 500, height: 500, crop: 'limit' }]
        });

        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new ValidationError('Failed to upload file to Cloudinary');
    }
};
