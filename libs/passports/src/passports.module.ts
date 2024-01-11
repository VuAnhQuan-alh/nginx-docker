import { Module } from '@nestjs/common';
import { PassportsService } from './passports.service';

@Module({
  providers: [PassportsService],
  exports: [PassportsService],
})
export class PassportsModule {}
