import { PassportsModule } from '@auth/passports';
import { CommonModule } from '@libs/common';
import { DatabaseAdminModule } from '@libs/common/database/database-admin.module';
import { AppLoggerModule } from '@libs/common/middleware/logger-request';
import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, DatabaseAdminModule, UsersModule, PassportsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule extends AppLoggerModule {}
