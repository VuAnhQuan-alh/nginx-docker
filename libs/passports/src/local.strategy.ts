import { UsersService } from '@admin/auth/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly users: UsersService) {
    super({ usernameField: 'identify' });
  }

  async validate(identify: string, password: string) {
    try {
      return this.users.verifyUser(identify, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
