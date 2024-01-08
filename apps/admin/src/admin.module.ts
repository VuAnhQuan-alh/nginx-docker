import { CommonModule } from '@libs/common';
import { DatabaseAdminModule } from '@libs/common/database/database-admin.module';
import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AppLoggerModule } from '@libs/common/middleware/logger-request';

@Module({
  imports: [CommonModule, DatabaseAdminModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule extends AppLoggerModule {}
