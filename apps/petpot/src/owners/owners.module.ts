import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { DatabasePetModule } from '@libs/common/database/database-pet.module';
import { OwnerDocument, OwnerSchema } from '../models/owner.schema';
import { OwnerRepository } from '../models/owner.repository';
import { PetsModule } from '../pets/pets.module';

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
