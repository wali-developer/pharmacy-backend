import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(userDto: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(userDto.password, 10);
    return this.model.create({ ...userDto, password: hashed });
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async findAll() {
    return this.model.find();
  }
}
