import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from '@auth/passports/local-auth.guard';
import { CurrentUser } from './models/user.decorator';
import { UserDocument } from './models/user.schema';
import { Response } from 'express';
import { JwtAuthGuard } from '@auth/passports/jwt-auth.guard';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('healthy')
  getHello(): string {
    return this.adminService.getHello();
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async authentication(
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
}
