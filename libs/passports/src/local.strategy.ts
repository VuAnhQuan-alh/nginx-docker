import { Strategy } from 'passport-local';

import { UsersService } from '@admin/auth/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly users: UsersService) {
    super({ usernameField: 'identify' });
  }

  async validate(identify: string, password: string) {
    return this.users.verifyUser(identify, password);
  }
}
