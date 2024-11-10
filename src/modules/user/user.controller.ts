import {
  BadRequestException,
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CanActivate } from 'src/guard/guard.guard';
import { Roles } from 'src/roles/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private _UserService: UserService) {}

  @Get()
  // @SetMetadata('roles', ['Admin'])
  @Roles(['Admin'])
  @UseGuards(CanActivate)
  getuser(@Req() req: any) {
    return this._UserService.getuser(req);
  }

  @UseGuards(CanActivate)
  @Patch('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any, // هنا نمرر req الذي يحتوي على بيانات المستخدم
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      return await this._UserService.profileImage(file, req); // تمرير req للمستخدم
    } catch (error) {
      throw new BadRequestException(`Error uploading image: ${error.message}`);
    }
  }
}
