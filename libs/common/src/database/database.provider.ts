import { DataSource } from 'typeorm';

import { BadRequestException, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { XTenantId } from '../constant';
import { DatabaseService } from './database.service';

export const DataSourceFactory: { [key: string]: Provider } = {
  [Scope.DEFAULT]: {
    provide: 'DATA_DEFAULT',
    useFactory: (): null => {
      return null;
    },
  },
  [Scope.REQUEST]: {
    provide: 'DATA_SOURCE',
    inject: [REQUEST],
    scope: Scope.REQUEST,
    useFactory: async (
      req,
      databaseService: DatabaseService,
    ): Promise<DataSource | null> => {
      const tenant = req.headers[XTenantId];
      console.log('vao day roi', { tenant });

      if (tenant) {
        const databaseName = await databaseService.getDatabaseName(tenant);
        return databaseService.getDBDataSource(databaseName);
      } else {
        throw new BadRequestException('Missing x-tenant-id header');
      }
    },
  },
};
