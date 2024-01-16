import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';

@Module({
  imports: [
    NestConfig.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT_PET: Joi.number().required(),
        MONGOOSE_URI_PET: Joi.string().required(),

        PORT_BOOKING: Joi.number().required(),
        MONGOOSE_URI_BOOKING: Joi.string().required(),

        PORT_ADMIN: Joi.number().required(),
        MONGOOSE_URI_ADMIN: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES: Joi.number().required(),

        TCP_PORT: Joi.number().required(),
      }),
    }),
  ],
  exports: [NestConfig],
})
export class ConfigModule {}
