import { Injectable } from '@nestjs/common';

import { UserDocument } from '../models/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(data: CreateUserDTO): Promise<UserDocument> {
    return await this.userRepo.create(data);
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
}
