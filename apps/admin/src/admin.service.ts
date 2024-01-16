import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDocument } from './models/user.schema';
import { ITokenPayload } from '@auth/passports/interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';

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
