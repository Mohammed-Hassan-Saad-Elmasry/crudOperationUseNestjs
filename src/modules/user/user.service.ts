import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  getuser(req: any) {
    return req.user;
  }
}
