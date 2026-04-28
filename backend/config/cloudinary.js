import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'sample_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'sample_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'sample_secret',
});

export default cloudinary;
