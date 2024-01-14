import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { UserDocument } from '../models/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersRepository } from '../models/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async create(data: CreateUserDTO): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    return await this.userRepo.create({ ...data, password: hash });
  }

  async findAll(): Promise<[UserDocument[], number]> {
    return await this.userRepo.findAndCount({});
  }

  async findOne(_id: string): Promise<UserDocument> {
    return await this.userRepo.findOne({ _id });
  }

  async update(_id: string, data: UpdateUserDTO): Promise<UserDocument> {
    return await this.userRepo.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string) {
    return await this.userRepo.findOneAndDelete({ _id });
  }

  async verifyUser(identify: string, password: string) {
    try {
      const user = await this.userRepo.findOne({
        $or: [{ email: identify }, { username: identify }],
      });
      const passValid = await bcrypt.compare(password, user.password);

      if (!passValid)
        throw new UnauthorizedException('Credentials are not valid.');

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
