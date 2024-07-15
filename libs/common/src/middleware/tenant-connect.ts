import { NextFunction, Request, Response } from 'express';

import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';

// import { DatabaseService } from '../database/database.service';
import { AppLoggerMiddleware } from './logger-request';

@Injectable()
export class TenantConnectMiddleware implements NestMiddleware {
  // constructor(private readonly databaseService: DatabaseService) {}
  private logger = new Logger('XTenantId');

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      this.logger.error('Tenant ID not found');
      return res.status(400).send({ message: 'Tenant ID is required!' });
    }

    // const database = await this.databaseService.getConnection(tenantId);
    // if (!database) {
    //   this.logger.error('Tenant ID not exist');
    //   return res.status(400).send({ message: 'Tenant ID is does not exist!' });
    // }

    // req['dbConnection'] = database;
    next();
  }
}

export class AppTenantConnectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware, TenantConnectMiddleware).forRoutes('*');
  }
}
