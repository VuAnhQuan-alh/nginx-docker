import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from '@auth/passports/local-auth.guard';
import { CurrentUser } from './models/users.decorator';
import { UserDocument } from './models/user.schema';
import { Response } from 'express';

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
    await this.adminService.login(user, response);
    return {
      data: user,
      message: 'Login to admin successful!',
      statusCode: HttpStatus.OK,
    };
  }
}
