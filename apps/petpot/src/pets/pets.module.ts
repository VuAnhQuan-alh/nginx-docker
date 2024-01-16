import { CommonService } from '@libs/common';
import { DatabasePetModule } from '@libs/common/database/database-pet.module';
import { Module } from '@nestjs/common';

import { PetRepository } from '../models/pet.repository';
import { PetDocument, PetSchema } from '../models/pet.schema';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports: [
    DatabasePetModule.forFeature([
      { name: PetDocument.name, schema: PetSchema },
    ]),
  ],
  controllers: [PetsController],
  providers: [PetsService, CommonService, PetRepository],
  exports: [PetsService, PetRepository],
})
export class PetsModule {}
