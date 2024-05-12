import { Response } from 'express';

import { JwtAuthGuard } from '@auth/passports/jwt-auth.guard';
import { LocalAuthGuard } from '@auth/passports/local-auth.guard';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AdminService } from './admin.service';
import { CurrentUser } from './models/user.decorator';
import { UserDocument } from './models/user.schema';
import { ServiceMessage } from '@micro/microservice/utils/service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('healthy')
  getHello() {
    return this.adminService.getHello();
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.adminService.login(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async information(@CurrentUser() user: UserDocument) {
    delete user.password;
    return { data: user, message: 'Get profile successful!' };
  }

  @MessagePattern(ServiceMessage.AUTHENTICATION)
  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload(ValidationPipe) data) {
    try {
      return data.user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @MessagePattern(ServiceMessage.GET_ADMIN)
  helloAdmin(data: { message: string }) {
    return `Ahi admin day roi - ${data.message}`;
  }
}
