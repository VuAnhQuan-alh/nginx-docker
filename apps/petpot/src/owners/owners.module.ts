import { DatabasePetModule } from '@libs/common/database/database-pet.module';
import { Module } from '@nestjs/common';

import { OwnerRepository } from '../models/owner.repository';
import { OwnerDocument, OwnerSchema } from '../models/owner.schema';
import { PetsModule } from '../pets/pets.module';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';

@Module({
  imports: [
    DatabasePetModule.forFeature([
      { name: OwnerDocument.name, schema: OwnerSchema },
    ]),
    PetsModule,
  ],
  controllers: [OwnersController],
  providers: [OwnersService, OwnerRepository],
})
export class OwnersModule {}
