import { AbstractRepository } from '@libs/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { PetDocument } from './pet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PetRepository extends AbstractRepository<PetDocument> {
  protected readonly logger = new Logger(PetRepository.name);

  constructor(@InjectModel(PetDocument.name) petModel: Model<PetDocument>) {
    super(petModel);
  }
}
