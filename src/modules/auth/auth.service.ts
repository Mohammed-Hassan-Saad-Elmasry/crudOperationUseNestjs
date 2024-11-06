import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO, signupDTO } from './validation/auth.DTO';

import { ServiceDB } from './auth.Db.Service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private _ServiceDB: ServiceDB,
    private _JwtService: JwtService,
  ) {}
  async signup(body: signupDTO) {
    const { username, email, password } = body;
    const existingUser = await this._ServiceDB.findOne(email);
    if (existingUser) {
      throw new ConflictException('email exist');
    }
    const hashpass = bcrypt.hashSync(password, 8);
    const newUser = await this._ServiceDB.createuser({
      username,
      email,
      password: hashpass,
    });
    return { message: 'User created successfully', newUser };
  }

  async Login(body: LoginDTO) {
    const { email, password } = body;

    const user = this._ServiceDB.findOne(email.toLocaleLowerCase());
    if (!user) {
      throw new NotFoundException('email not fond');
    }

    if (!bcrypt.compareSync(password, (await user).password)) {
      throw new BadRequestException('In-valid Login data');
    }

    const accessToken = this._JwtService.sign(
      {
        id: (await user)['_id'],
        username: (await user).username,
        role: (await user).role,
      },
      {
        secret: 'hamo',
        expiresIn: 60 * 60, // corrected option for expiration
      },
    );

    const refreshToken = this._JwtService.sign(
      {
        id: (await user)['_id'],
        username: (await user).username,
        role: (await user).role,
      },
      {
        secret: 'Hamo',
        expiresIn: '1y', // corrected option for expiration
      },
    );

    return {
      ms: 'done',
      user: await user,
      accessToken,
      refreshToken,
    };
  }
}
