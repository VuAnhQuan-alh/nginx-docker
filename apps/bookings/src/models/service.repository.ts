import { Model } from 'mongoose';

import { AbstractRepository } from '@libs/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ServiceDocument } from './service.schema';

@Injectable()
export class ServiceRepository extends AbstractRepository<ServiceDocument> {
  protected readonly logger = new Logger(ServiceRepository.name);

  constructor(
    @InjectModel(ServiceDocument.name) serviceModel: Model<ServiceDocument>,
  ) {
    super(serviceModel);
  }
}
