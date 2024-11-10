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
    const existingUser = await this._ServiceDB.findOne(email.toLowerCase());
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashpass = bcrypt.hashSync(password, 8);
    const newUser = await this._ServiceDB.createuser({
      username,
      email,
      password: hashpass,
    });
    return { message: 'User created successfully', newUser };
  }

  async login(body: LoginDTO) {
    const { email, password } = body;

    const user = await this._ServiceDB.findOne(email.toLowerCase());
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid login data');
    }

    const accessToken = this._JwtService.sign(
      {
        id: user['_id'],
        username: user.username,
        role: user.role,
      },
      {
        secret: 'hamo',
        expiresIn: 60 * 60, // صلاحية التوكن ساعة
      },
    );

    const refreshToken = this._JwtService.sign(
      {
        id: user['_id'],
        username: user.username,
        role: user.role,
      },
      {
        secret: 'Hamo',
        expiresIn: '1y', // صلاحية التوكن سنة
      },
    );

    return {
      message: 'Login successful',
      user,
      accessToken,
      refreshToken,
    };
  }
}
