import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { CommonService } from '@libs/common';
import { DatabasePetModule } from '@libs/common/database/database-pet.module';
import { PetDocument, PetSchema } from '../models/pet.schema';
import { PetRepository } from '../models/pet.repository';

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
