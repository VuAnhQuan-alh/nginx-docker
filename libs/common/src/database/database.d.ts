import { DataSource } from 'typeorm';

export type Database = {
  id: number;
  name: string;
  type: DataSource.type;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
};

export type DatabaseConfig = {
  [key: number]: DatabaseConfig;
};
