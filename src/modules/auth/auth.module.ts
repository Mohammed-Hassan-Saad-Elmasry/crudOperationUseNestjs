import { AuthController } from './auth.controller';
import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegister } from '../schema/user.model';
import { ServiceDB } from './auth.Db.Service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/utils/cloudinary';

@Module({
  imports: [userRegister],
  controllers: [AuthController],
  providers: [
    AuthService,
    ServiceDB,
    JwtService,
    ValidationPipe,
    CloudinaryService,
  ],
})
export class AuthModel {}
