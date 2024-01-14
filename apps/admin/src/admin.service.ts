import { Response } from 'express';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDocument } from './models/user.schema';
import { ConfigService } from '@nestjs/config';
import { PassportsService } from '@auth/passports';
import { ITokenPayload } from '@auth/passports/interfaces/token-payload.interface';

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
      const tokenPayload: ITokenPayload = {
        userId: user._id.toHexString(),
      };
      const token = this.jwtService.sign(tokenPayload);
      console.log('token', token);

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
      console.log('error:', error.message);

      throw new BadRequestException(error);
    }
  }
}
