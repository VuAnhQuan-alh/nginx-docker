import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuperEntity } from './entities/super.entity';
import { SuperController } from './super.controller';
import { SuperService } from './super.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperEntity])],
  controllers: [SuperController],
  providers: [SuperService],
})
export class SuperModule {}
