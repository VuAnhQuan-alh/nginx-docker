import { AbstractRepository } from '@libs/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { OwnerDocument } from './owner.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OwnerRepository extends AbstractRepository<OwnerDocument> {
  protected readonly logger = new Logger(OwnerRepository.name);

  constructor(
    @InjectModel(OwnerDocument.name) ownerModel: Model<OwnerDocument>,
  ) {
    super(ownerModel);
  }
}
