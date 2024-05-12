import { Module } from '@nestjs/common';
import { SuperService } from './super.service';
import { SuperController } from './super.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperEntity } from './entities/super.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuperEntity])],
  controllers: [SuperController],
  providers: [SuperService],
})
export class SuperModule {}
