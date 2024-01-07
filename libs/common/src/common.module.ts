import { Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
