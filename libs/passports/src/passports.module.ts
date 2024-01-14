import { Module } from '@nestjs/common';
import { PassportsService } from './passports.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '@admin/auth/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: `${config.get<number>('JWT_EXPIRES')}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PassportsService, LocalStrategy, JwtStrategy],
  exports: [PassportsService],
})
export class PassportsModule {}
