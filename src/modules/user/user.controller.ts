import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CanActivate } from 'src/guard/guard.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private _UserService: UserService) {}

  @Get()
  //   @SetMetadata('roles', ['Admin'])
  @Roles(['Admin'])
  @UseGuards(CanActivate)
  getuser(@Req() req: any) {
    return this._UserService.getuser(req);
  }
}
