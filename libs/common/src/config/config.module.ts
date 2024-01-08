import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfig.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT_PET: Joi.number().required(),
        MONGOOSE_URI_PET: Joi.string().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
