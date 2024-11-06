import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ServiceDB } from 'src/modules/auth/auth.Db.Service';

@Injectable()
export class CanActivate {
  constructor(
    private _ServiceDB: ServiceDB,
    private _JwtService: JwtService,
    private _Reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    if (!authorization) {
      throw new BadRequestException('Invalid Bearer Key');
    }
    const token = authorization.split('Bearer ')[1];
    if (!token) {
      throw new BadRequestException('Invalid token');
    }
    try {
      const decoded = await this._JwtService.verifyAsync(token, {
        secret: 'hamo',
      });
      if (!decoded?.id) {
        throw new BadRequestException('Invalid token payload');
      }
      const user = await this._ServiceDB.findById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Invalid login account');
      }
      const roles = this._Reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
      ]);
      if (roles && !roles.includes(user.role)) {
        throw new ForbiddenException('Unauthorized Account');
      }
      req.user = user;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode || 400);
    }
    return true;
  }
}
