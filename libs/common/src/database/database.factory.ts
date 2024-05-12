import { Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
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
    inject: [REQUEST, DataSource],
    scope: Scope.REQUEST,
    useFactory: async (
      req,
      databaseService: DatabaseService,
    ): Promise<DataSource | null> => {
      const tenant = req.headers[XTenantId];
      console.log('vao day roi', { tenant });

      if (tenant) {
        const database = await databaseService.getConnection(tenant);
        return database;
      } else {
        return null;
      }
    },
  },
};
