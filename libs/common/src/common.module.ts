import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { InterceptorModule } from './interceptor/interceptor.module';

@Module({
  imports: [
    ConfigModule,
    InterceptorModule,
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
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
