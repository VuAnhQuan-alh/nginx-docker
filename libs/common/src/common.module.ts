import { Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { ConfigModule } from './config/config.module';
import { InterceptorModule } from './interceptor/interceptor.module';

@Module({
  imports: [ConfigModule, InterceptorModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
