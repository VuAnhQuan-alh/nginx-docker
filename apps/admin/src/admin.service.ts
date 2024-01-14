import { Response } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from './models/user.schema';
import { ConfigService } from '@nestjs/config';
import { PassportsService } from '@auth/passports';

@Injectable()
export class AdminService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: PassportsService,
  ) {}

  getHello(): string {
    return 'Hello World ADMIN SERVICE\n';
  }

  async login(user: UserDocument, response: Response) {
    try {
      const tokenPayload = {
        userId: user._id.toHexString(),
      };
      const token = this.jwtService.sign(tokenPayload);
      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + this.config.get<number>('JWT_EXPIRES'),
      );
      response.cookie('Authentication', token, {
        httpOnly: true,
        expires,
      });
      response.send(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
