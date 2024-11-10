import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/utils/cloudinary';

@Injectable()
export class UserService {
  constructor(private _CloudinaryService: CloudinaryService) {}

  getuser(req: any) {
    return req.user; // إرجاع بيانات المستخدم
  }

  async profileImage(file: Express.Multer.File, req: any): Promise<any> {
    try {
      const user = req.user;
      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (user.image && user.image.public_id) {
        await this._CloudinaryService.destroy(user.image.public_id);
      }
      const result = await this._CloudinaryService.uploadImage(file);

      user.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await user.save();
      return {
        message: 'Image uploaded successfully',
        secure_url: result.secure_url, // إرجاع رابط الصورة الآمن
      };
    } catch (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }
  }
}
