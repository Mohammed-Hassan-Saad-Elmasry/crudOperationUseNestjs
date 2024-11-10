import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dzjmnns0d',
      api_key: '917792522917824',
      api_secret: 'Cd1DFjxwXWV2M-mnHxaLq3huJVA',
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: `crud_opration/user/profileImages`,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message)); // إذا حدث خطأ
          } else {
            resolve(result); // إرجاع الرابط الآمن للصورة
          }
        },
      );

      uploadStream.end(file.buffer); // رفع الصورة من buffer
    });
  }

  async destroy(public_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
          reject(new Error('Error deleting image: ' + error.message));
        } else {
          resolve(result);
        }
      });
    });
  }
}
