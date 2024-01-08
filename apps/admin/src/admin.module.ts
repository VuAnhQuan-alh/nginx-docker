import { CommonModule } from '@libs/common';
import { DatabaseAdminModule } from '@libs/common/database/database-admin.module';
import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AppLoggerModule } from '@libs/common/middleware/logger-request';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, DatabaseAdminModule, UsersModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule extends AppLoggerModule {}
