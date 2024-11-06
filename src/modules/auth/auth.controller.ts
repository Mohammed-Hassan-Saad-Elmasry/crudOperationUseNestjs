import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, signupDTO } from './validation/auth.DTO';
import { ValidatiompipePipe } from 'src/pipe/validatiompipe/validatiompipe.pipe';
import * as validators from '../auth/validation/auth.joi';
@Controller('auth')
export class AuthController {
  constructor(private _AuthService: AuthService) {}
  @UsePipes(new ValidatiompipePipe(validators.singup))
  @Post('signup')
  async signup(@Body() body: signupDTO) {
    return await this._AuthService.signup(body);
  }

  @Post('login')
  async Login(@Body() body: LoginDTO) {
    return await this._AuthService.Login(body);
  }
}
