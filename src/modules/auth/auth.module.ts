import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegister } from '../schema/user.model';
import { ServiceDB } from './auth.Db.Service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [userRegister],
  controllers: [AuthController],
  providers: [AuthService, ServiceDB, JwtService],
})
export class AuthModel {}
