import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.model';
import { Model } from 'mongoose';
import { signupDTO } from './validation/auth.DTO';

@Injectable()
export class ServiceDB {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createuser(data: signupDTO): Promise<User> {
    const user = await this.userModel.create(data);
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById({ _id: id });
    return user;
  }
}
