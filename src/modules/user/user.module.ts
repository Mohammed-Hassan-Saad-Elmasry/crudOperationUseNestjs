import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userRegister } from '../schema/user.model';
import { ServiceDB } from '../auth/auth.Db.Service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [userRegister],
  controllers: [UserController],
  providers: [UserService, ServiceDB, JwtService],
})
export class UserModule {}