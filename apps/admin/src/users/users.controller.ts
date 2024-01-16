import { JwtAuthGuard } from '@auth/passports/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UsersService } from './users.service';
import { RolesGuard } from '../models/role.guard';
import { RolesOfAdmin } from '../models/role.decorator';
import { TypeRoles } from '@libs/common/constant/enum.fields';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    const result = await this.usersService.create(data);
    return { data: result, message: 'Created successful!' };
  }

  @Get()
  @RolesOfAdmin([TypeRoles.ADMIN, TypeRoles.LEADER])
  async getUsers() {
    const [data, total] = await this.usersService.findAll();
    return { data, total, message: 'Get list successful!' };
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const result = await this.usersService.findOne(id);
    return { data: result, message: 'Get one successful!' };
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const result = await this.usersService.update(id, data);
    return { data: result, message: 'Updated successful!' };
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    return { data: result, message: 'Deleted successful!' };
  }
}
