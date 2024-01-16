import { ITokenPayload } from '@auth/passports/interfaces/token-payload.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDocument } from './models/user.schema';

@Injectable()
export class AdminService {
  constructor(private readonly jwtService: JwtService) {}

  getHello(): string {
    return 'Hello World ADMIN SERVICE\n';
  }

  async login(user: UserDocument) {
    try {
      const tokenPayload: ITokenPayload = {
        userId: user._id.toHexString(),
      };
      const token = await this.jwtService.signAsync(tokenPayload);
      return {
        data: { profile: user, token },
        message: 'Login to PetPot successful!',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
