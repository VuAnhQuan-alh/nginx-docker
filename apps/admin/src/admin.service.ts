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

  async login(user: UserDocument) {
    try {
      const tokenPayload: ITokenPayload = {
        userId: user._id.toHexString(),
      };
      const token = this.jwtService.sign(tokenPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
      return {
        data: { profile: user, token },
        message: 'Login to PetPot successful!',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
