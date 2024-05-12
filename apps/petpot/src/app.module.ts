import { CommonModule } from '@libs/common';
import { DatabasePetModule } from '@libs/common/database/database-pet.module';
import { AppLoggerModule } from '@libs/common/middleware/logger-request';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnersModule } from './owners/owners.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [CommonModule, DatabasePetModule, OwnersModule, PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule extends AppLoggerModule {} // 4030
