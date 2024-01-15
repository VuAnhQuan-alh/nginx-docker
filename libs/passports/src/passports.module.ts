import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '@admin/auth/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [LocalStrategy, JwtStrategy],
  exports: [PassportModule],
})
export class PassportsModule {}
