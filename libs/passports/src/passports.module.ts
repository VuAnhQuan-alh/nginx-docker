import { UsersModule } from '@admin/auth/users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [LocalStrategy, JwtStrategy],
  exports: [PassportModule],
})
export class PassportsModule {}
