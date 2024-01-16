import { Response } from 'express';

import { JwtAuthGuard } from '@auth/passports/jwt-auth.guard';
import { LocalAuthGuard } from '@auth/passports/local-auth.guard';
import { SERVICE_PATTERN } from '@libs/common/constant/service.name';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AdminService } from './admin.service';
import { CurrentUser } from './models/user.decorator';
import { UserDocument } from './models/user.schema';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('healthy')
  getHello(): string {
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
    try {
      return { data: user, message: 'Get profile successful!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @MessagePattern(SERVICE_PATTERN.AUTHENTICATION)
  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data) {
    try {
      return data.user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
