import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '@admin/auth/users/users.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  protected readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly config: ConfigService,
    private readonly users: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: ITokenPayload) {
    try {
      return await this.users.findOne(payload.userId);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  error(err: Error): void {
    this.logger.error(err.message);
    throw new BadRequestException(err.message);
  }
}
