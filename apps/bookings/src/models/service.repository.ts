import { AbstractRepository } from '@libs/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ServiceDocument } from './service.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ServiceRepository extends AbstractRepository<ServiceDocument> {
  protected readonly logger = new Logger(ServiceRepository.name);

  constructor(
    @InjectModel(ServiceDocument.name) serviceModel: Model<ServiceDocument>,
  ) {
    super(serviceModel);
  }
}
